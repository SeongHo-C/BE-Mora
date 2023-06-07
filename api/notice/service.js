const Notice = require('./model');
const Admin = require('../admin/model');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const { BadRequestClass, UnauthorizedClass } = require('../../middlewares');

module.exports = {
  async addNotice(noticeInfo) {
    const { admin_id } = noticeInfo;
    const admin = await Admin.findOne({ where: { id: admin_id } });
    if (!admin) {
      throw new UnauthorizedClass('존재하지 않는 관리자 ID입니다.');
    }

    const notice = await Notice.create(noticeInfo);
    return notice;
  },

  async getNotices(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let notices;

    if (!keyword || keyword === ':keyword') {
      notices = await Notice.findAndCountAll({
        include: [
          {
            model: Admin,
            attributes: ['name', 'email'],
          },
        ],
        order: [['created_at', 'DESC']],
        offset,
        limit,
      });
    } else {
      notices = await Notice.findAndCountAll({
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
            { '$Admin.email$': { [Op.like]: `%${keyword}%` } },
          ],
        },
        order: [['created_at', 'DESC']],
        offset,
        limit,
      });
    }
    notices = getPagingData(notices, page, limit);

    return notices;
  },

  async setNotice(id, toUpdate) {
    const { title, content } = toUpdate;

    const notice = await Notice.findOne({ where: { id: id } });
    if (!notice) {
      throw new BadRequestClass('존재하지 않는 공지입니다.');
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
      throw new BadRequestClass(`${title} 공지 수정 처리에 실패하였습니다.`);
    }

    return updateCount;
  },

  async deleteNotice(id) {
    const notice = await Notice.findOne({ where: { id: id } });
    if (!notice) {
      throw new BadRequestClass('존재하지 않는 공지입니다.');
    }

    const deleteCount = await Notice.destroy({ where: { id: id } });
    if (deleteCount < 1) {
      throw new BadRequestClass(`${id} 공지 삭제 처리에 실패하였습니다.`);
    }
    return deleteCount;
  },
};
