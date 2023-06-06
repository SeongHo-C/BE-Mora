const Report = require('./model');
const Board = require('../board/model');
const Comment = require('../comment/model');
const User = require('../user/model');
const { Op } = require('sequelize');

const reportService = {
  async addReport(reportInfo) {
    const { target_id, type } = reportInfo;
    if (type == 1) {
      const board = await Board.findOne({
        attributes: ['id'],
        where: { id: target_id },
      });
      if (!board) {
        throw new Error(
          '존재하지 않는 게시글입니다. 다시 한 번 확인해 주세요.'
        );
      }
    } else if (type == 2) {
      const comment = await Comment.findOne({
        attributes: ['id'],
        where: { id: target_id },
      });
      if (!comment) {
        throw new Error('존재하지 않는 댓글입니다. 다시 한 번 확인해 주세요.');
      }
    }

    const report = await Report.create(reportInfo);
    return report;
  },

  async getAllReports() {
    const reports = await Report.findAll({
      include: [
        {
          model: Board,
          attributes: ['writer', 'title', 'content'],
        },
        {
          model: Comment,
          attributes: ['commenter', 'content'],
        },
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });
    return reports;
  },

  async getUserReports(id) {
    const reports = await Report.findAll({ where: { from_user_id: id } });
    if (!reports) {
      throw new Error('사용자가 신고한 내용이 없습니다.');
    }

    return reports;
  },

  async getReports(keyword) {
    console.log('keyword:', keyword);
    let reports = {};
    if (!keyword || keyword === ':keyword') {
      reports = await Report.findAll({});
    } else {
      reports = await Report.findAll({
        include: [
          {
            model: Board,
            attributes: ['writer', 'title', 'content'],
          },
          {
            model: Comment,
            attributes: ['commenter', 'content'],
            // where: { content: { [Op.like]: `%${keyword}%` } },
          },
          {
            model: User,
            attributes: ['name', 'email'],
            // where: {
            //   [Op.or]: [
            //     { name: { [Op.like]: `%${keyword}%` } },
            //     { email: { [Op.like]: `%${keyword}%` } },
            //   ],
            // },
          },
        ],
        where: {
          [Op.or]: [
            { content: { [Op.like]: `%${keyword}%` } },
            { '$Board.title$': { [Op.like]: `%${keyword}%` } },
            { '$Board.content$': { [Op.like]: `%${keyword}%` } },
            { '$Comment.content$': { [Op.like]: `%${keyword}%` } },
          ],
        },
      });
    }

    return reports;
  },
};

module.exports = reportService;
