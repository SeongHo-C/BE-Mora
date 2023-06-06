const Notice = require('./model');
const Admin = require('../admin/model');
const { Op } = require('sequelize');

const noticeService = {
  async addNotice(noticeInfo) {
    const notice = await Notice.create(noticeInfo);
    return notice;
  },

  async getNotices(keyword) {
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

    return notices;
  },

  async setNotice(id, toUpdate) {
    const { title, content } = toUpdate;
    const notice = await Notice.findOne({ where: { id: id } });
    if (!notice) {
      throw new Error('해당 게시글이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const updateCount = Notice.update(
      {
        title: title,
        content: content,
      },
      {
        where: { id: id },
      }
    );
    if (updateCount < 1) {
      throw new Error(`${id} 공지 수정 처리에 실패하였습니다.`);
    }

    return updateCount;
  },

  async deleteNotice(id) {
    const deleteCount = await Notice.destroy({ where: { id: id } });
    if (deleteCount < 1) {
      throw new Error(`${id} 공지 삭제 처리에 실패하였습니다.`);
    }
    return deleteCount;
  },
};

module.exports = noticeService;
