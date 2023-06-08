const Report = require('./model');
const Board = require('../board/model');
const Comment = require('../comment/model');
const User = require('../user/model');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const { NotFoundException } = require('../../middlewares');

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
};
