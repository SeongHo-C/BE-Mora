const { Alert, User, Comment, Board, Plan } = require('../../models');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

module.exports = {
  async addAlert(alertInfo) {
    const { type, target_id } = alertInfo;

    let alert = await Alert.create(alertInfo);
    if (!alert) {
      throw new InternalServerErrorException(
        `${id} 알림 등록 처리에 실패하였습니다.`
      );
    }

    if (type === 'COMMENT') {
      alert = await Alert.findOne({
        include: [
          {
            model: User,
            as: 'AlertFromUser',
            attributes: ['name', 'email'],
            include: [
              {
                model: Comment,
                attributes: ['content'],
                where: { board_id: target_id },
              },
            ],
          },
          {
            model: User,
            as: 'AlertToUser',
            attributes: ['name', 'email'],
            include: [
              {
                model: Board,
                attributes: ['title', 'content'],
              },
            ],
          },
        ],
        where: {
          id: alert.id,
        },
      });
    } else if (type === 'PLAN') {
      alert = await Alert.findOne({
        include: [
          {
            model: User,
            as: 'AlertFromUser',
            attributes: ['name', 'email'],
          },
          {
            model: User,
            as: 'AlertToUser',
            attributes: ['name', 'email'],
          },
          {
            model: Plan,
            attributes: ['title', 'content', 'start_date'],
          },
        ],
        where: {
          id: alert.id,
        },
      });
    }

    return alert;
  },

  async setAlert(id, toUser, checked) {
    const alert = await Alert.findOne({
      where: { id, to_user_id: toUser },
      raw: true,
    });
    if (!alert) {
      throw new NotFoundException(
        '존재하지 않는 알림이거나 알림 당사자가 아닌 사용자의 요청입니다.'
      );
    }

    if (alert.checked === 0 && checked === true) {
      const updateCount = await Alert.update(
        {
          checked,
        },
        { where: { id } }
      );
      if (!updateCount) {
        throw new InternalServerErrorException(
          `${id} 알림 확인 여부 수정 처리에 실패하였습니다.`
        );
      }
    } else {
      throw new BadRequestException(
        '이미 읽은 알림은 다시 수정할 수 없습니다.'
      );
    }

    return await Alert.findOne({
      include: [
        {
          model: User,
          as: 'AlertFromUser',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      where: {
        id: alert.id,
      },
    });
  },

  async getAlerts() {
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const fiveDaysAgo = dayjs()
      .subtract(5, 'day')
      .format('YYYY-MM-DD HH:mm:ss');

    const comments = await Alert.findAll({
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
        type: 'COMMENT',
      },
      raw: true,
      include: [
        {
          model: User,
          as: 'AlertFromUser',
          attributes: ['name', 'email'],
          include: [
            {
              model: Board,
              attributes: ['title', 'content'],
              include: [
                {
                  model: Comment,
                  attributes: ['content'],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    // 최근 5일 이내의 일정 정보 조회
    let plan = await Plan.findAll({
      attributes: ['id', 'title', 'content', 'start_date'],
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
      },
      raw: true,
      order: [['start_date', 'DESC']],
    });

    let planId = [];
    let planTitle = [];
    let planContent = [];
    let planStartDate = [];
    plan.forEach((p) => {
      planId.push(p.id);
      planTitle.push(p.title);
      planContent.push(p.content);
      planStartDate.push(p.start_date);
    });

    // 알림에 있는 plan정보 조회
    const plans = await Alert.findAll({
      where: {
        created_at: { [Op.between]: [fiveDaysAgo, currentTime] },
        type: 'PLAN',
      },
      raw: true,
      include: [
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    // 알림에 있는 target_id가 일정의 id와 같으면 입력 처리
    for (let i = 0; i < plans.length; i++) {
      if (plans[i].target_id === planId[i]) {
        plans[i].planTitle = planTitle[i];
        plans[i].planContent = planContent[i];
        plans[i].planStartDate = planStartDate[i];
      }
    }

    return { comments, plans };
  },
};
