const cron = require('node-cron');
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const mailer = require('./send-mail');
const serviceHandler = require('./service-handler');
const { Plan, User, Alert } = require('../models');
const logger = require('../logger');
const { InternalServerErrorException } = require('../middlewares');

cron.schedule(
  '0 * * * *',
  serviceHandler(async () => {
    logger.info('node-cron 스케줄링은 1시간마다 실행됩니다.');
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const nextHour = dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');

    const plan = await Plan.findAll({
      where: { start_date: { [Op.between]: [currentTime, nextHour] } },
      raw: true,
    });

    if (plan.length > 0) {
      logger.info('1시간 내 일정이 있습니다.');

      let subject = '';
      let text = '';
      let planId = '';
      plan.forEach((p) => {
        subject += p.title;
        text += p.content;
        planId += p.id;
      });

      const users = await User.findAll({
        attributes: ['id', 'email'],
        raw: true,
      });

      /**
       * 일정 1시간 전 알림 등록
       */
      let plans = [];
      users.forEach((u) => {
        plans.push({
          from_user_id: u.id,
          to_user_id: u.id,
          type: 'PLAN',
          target_id: planId,
        });
      });

      const alerts = await Alert.bulkCreate(plans).then(() => {
        return Alert.findAll();
      });
      if (!alerts) {
        throw new InternalServerErrorException(
          '스케줄링에서 일정 알림 등록 처리에 실패하였습니다.'
        );
      }

      /**
       * 일정 1시간 전 메일 전송
       */
      users.forEach((emails) => {
        mailer.sendGmail(emails.email, subject, text);
      });
    }
  })
);
