const { Plan, PlanLink } = require('./model');
const Admin = require('../admin/model');
const { Op } = require('sequelize');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addPlan(planInfo, links) {
    const { start_date, end_date } = planInfo;
    if (start_date > end_date) {
      throw new BadRequestException(
        'end_date는 start_date보다 앞선 일자일 수 없습니다.'
      );
    }

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

      const planLinks = await PlanLink.bulkCreate(links).then(() => {
        return PlanLink.findAll();
      });

      if (!planLinks) {
        throw new InternalServerErrorException(
          `일정 링크 생성에 실패하였습니다.`
        );
      }
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

    return Plan.findAll({
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
      order: [
        ['start_date', 'ASC'],
        ['end_date', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
  },

  async getYearMonthDay(yearMonthDay) {
    return Plan.findAll({
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
      order: [
        ['start_date', 'ASC'],
        ['end_date', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
  },

  async setPlan(id, toUpdate, links) {
    const { start_date, end_date } = toUpdate;
    if (start_date > end_date) {
      throw new BadRequestException(
        'end_date는 start_date보다 앞선 일자일 수 없습니다.'
      );
    }

    let plan = await Plan.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException('존재하지 않는 일정입니다.');
    }

    if (links) {
      const pastLinks = await PlanLink.findOne({ where: { plan_id: id } });
      if (pastLinks) {
        const deleteCount = await PlanLink.destroy({
          where: { plan_id: id },
        });
        if (!deleteCount) {
          throw new InternalServerErrorException(
            `수정 전 일정 링크 삭제 처리에 실패하였습니다.`
          );
        }
      }

      links.forEach((ele) => {
        ele.plan_id = id;
      });

      const planLinks = await PlanLink.bulkCreate(links).then(() => {
        return PlanLink.findAll();
      });

      if (!planLinks) {
        throw new InternalServerErrorException(
          `일정 링크 생성에 실패하였습니다.`
        );
      }
    }

    const updateCount = await Plan.update(toUpdate, {
      where: { id },
    });
    if (!updateCount) {
      throw new InternalServerErrorException(
        `일정 수정 처리에 실패하였습니다.`
      );
    }

    return await Plan.findOne({
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
      where: { id },
    });
  },

  async deletePlan(id) {
    const plan = await Plan.findOne({
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
        id,
      },
    });
    if (!plan) {
      throw new NotFoundException('존재하지 않는 일정입니다.');
    }

    const deletePlanCount = await Plan.destroy({ where: { id } });
    if (!deletePlanCount) {
      throw new InternalServerErrorException(
        `${id} 일정 삭제 처리에 실패하였습니다.`
      );
    }

    const planLinks = await PlanLink.findOne({ where: { plan_id: id } });
    if (planLinks) {
      const deleteLinkCount = await PlanLink.destroy({
        where: { plan_id: id },
      });
      if (!deleteLinkCount) {
        throw new InternalServerErrorException(
          `${id} 일정 링크 삭제 처리에 실패하였습니다.`
        );
      }
    }

    return plan;
  },
};
