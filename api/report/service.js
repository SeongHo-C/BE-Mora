const { Report, Board, Comment, User } = require('../../models');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const {
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addReport(reportInfo) {
    const { target_id, type } = reportInfo;
    if (type === 'BOARD') {
      const board = await Board.findOne({
        attributes: ['id', 'writer'],
        where: { id: target_id },
        raw: true,
      });
      if (!board) {
        throw new NotFoundException('존재하지 않는 게시글입니다.');
      }
      reportInfo.to_user_id = board.writer;
    } else if (type === 'COMMENT') {
      const comment = await Comment.findOne({
        attributes: ['id', 'commenter'],
        where: { id: target_id },
        raw: true,
      });
      if (!comment) {
        throw new NotFoundException('존재하지 않는 댓글입니다.');
      }
      reportInfo.to_user_id = comment.commenter;
    }

    return await Report.create(reportInfo);
  },

  async getReports(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let reports = await Report.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
          as: 'FromUser',
        },
        {
          model: User,
          attributes: ['name', 'email'],
          as: 'ToUser',
        },
      ],
      where: {
        [Op.or]: [
          { content: { [Op.like]: `%${keyword}%` } },
          { status: { [Op.like]: `%${keyword}%` } },
          { type: { [Op.like]: `%${keyword}%` } },
          { '$FromUser.name$': { [Op.like]: `%${keyword}%` } },
          { '$FromUser.email$': { [Op.like]: `%${keyword}%` } },
          { '$ToUser.name$': { [Op.like]: `%${keyword}%` } },
          { '$ToUser.email$': { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    reports = getPagingData(reports, page, limit);

    return reports;
  },

  async getDetailReport(id, type) {
    let report;
    if (type === 'BOARD') {
      report = await Report.findOne({
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
            as: 'FromUser',
          },
          {
            model: User,
            attributes: ['name', 'email'],
            as: 'ToUser',
          },
          {
            model: Board,
            attributes: ['title', 'content'],
          },
        ],
        where: { id },
      });
    } else if (type === 'COMMENT') {
      report = await Report.findOne({
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
            as: 'FromUser',
          },
          {
            model: User,
            attributes: ['name', 'email'],
            as: 'ToUser',
          },
          {
            model: Comment,
            attributes: ['content'],
          },
        ],
        where: { id },
      });
    }

    return report;
  },

  async setReport(id, status) {
    let report = await Report.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('존재하지 않는 신고입니다.');
    }
    const updateCount = await Report.update(
      {
        status,
      },
      {
        where: { id },
      }
    );
    if (!updateCount) {
      throw new InternalServerErrorException(
        `${id} 신고 상태 수정 처리에 실패하였습니다.`
      );
    }

    return await Report.findOne({ where: { id } });
  },

  async deleteReport(id) {
    let report = await Report.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('존재하지 않는 공지입니다.');
    }

    const deleteCount = await Report.destroy({ where: { id } });
    if (!deleteCount) {
      throw new InternalServerErrorException(
        `${id} 신고 내역 삭제 처리에 실패하였습니다.`
      );
    }

    return report;
  },
};
