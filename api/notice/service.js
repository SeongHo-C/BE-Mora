const Notice = require('./model');
const Admin = require('../admin/model');
const { Op } = require('sequelize');

const noticeService = {
  async addNotice(noticeInfo) {
    const notice = await Notice.create(noticeInfo);
    return notice;
  },

  async getNotices(keyword) {
    console.log('keyword:', keyword);
    const notices = await Notice.findAll({
      include: [
        {
          model: Admin,
          attributes: ['name', 'email'],
        },
      ],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
          { '$Admin.name$': { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    console.log('notices:', notices);
    return notices;
  },
};

module.exports = noticeService;
