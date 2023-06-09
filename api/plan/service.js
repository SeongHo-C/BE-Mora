const { Plan, PlanLink } = require('./model');
const Admin = require('../admin/model');
const { Op } = require('sequelize');
const {
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addPlan(planInfo, links) {
    let plan = await Plan.create(planInfo);
    if (!plan) {
      throw new InternalServerErrorException(
        '일정 등록 처리에 실패하였습니다.'
      );
    }

    if (links) {
      links.forEach((ele) => {
        ele.plan_id = plan.id;
      });

      await PlanLink.bulkCreate(links).then(() => {
        return PlanLink.findAll();
      });
    }

    plan = await Plan.findOne({
      include: [
        {
          model: PlanLink,
          attributes: ['id', 'url'],
        },
        {
          model: Admin,
          attributes: ['name', 'email'],
        },
      ],
      where: {
        id: plan.id,
      },
    });
    if (!plan) {
      throw new NotFoundException(`${plan.id}는 존재하지 않는 일정입니다.`);
    }

    return plan;
  },

  async getYearMonth(yearMonth) {
    const startDate = new Date(yearMonth + '-01');
    const endDate = new Date(yearMonth + '-01');
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    const plans = Plan.findAll({
      include: [
        {
          model: PlanLink,
          attributes: ['id', 'url'],
        },
        {
          model: Admin,
          attributes: ['name', 'email'],
        },
      ],
      where: {
        [Op.or]: [
          { start_date: { [Op.between]: [startDate, endDate] } },
          { end_date: { [Op.between]: [startDate, endDate] } },
        ],
      },
    });

    return plans;
  },

  async getYearMonthDay(yearMonthDay) {
    const plans = Plan.findAll({
      include: [
        {
          model: PlanLink,
          attributes: ['id', 'url'],
        },
        {
          model: Admin,
          attributes: ['name', 'email'],
        },
      ],
      where: {
        [Op.and]: [
          { start_date: { [Op.lte]: yearMonthDay } },
          { end_date: { [Op.gte]: yearMonthDay } },
        ],
      },
    });

    return plans;
  },
};
