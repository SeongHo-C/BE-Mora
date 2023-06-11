const { Notice, Admin } = require('../../models');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const {
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addNotice(noticeInfo) {
    const { admin_id } = noticeInfo;
    const admin = await Admin.findOne({ where: { id: admin_id } });
    if (!admin) {
      throw new NotFoundException('존재하지 않는 관리자 ID입니다.');
    }

    return await Notice.create(noticeInfo);
  },

  async getNotices(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let notices = await Notice.findAndCountAll({
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
    notices = getPagingData(notices, page, limit);

    return notices;
  },

  async getDetail(id) {
    const notice = await Notice.findOne({
      include: [
        {
          model: Admin,
          attributes: ['name', 'email'],
        },
      ],
      where: { id },
    });
    if (!notice) {
      throw new NotFoundException('존재하지 않는 공지입니다.');
    }

    return notice;
  },

  async setNotice(id, toUpdate) {
    const { title, content } = toUpdate;

    let notice = await Notice.findOne({ where: { id } });
    if (!notice) {
      throw new NotFoundException('존재하지 않는 공지입니다.');
    }

    const updateCount = await Notice.update(
      {
        title,
        content,
      },
      {
        where: { id },
      }
    );
    if (!updateCount) {
      throw new InternalServerErrorException(
        `${title} 공지 수정 처리에 실패하였습니다.`
      );
    }

    return await Notice.findOne({ where: { id } });
  },

  async deleteNotice(id) {
    let notice = await Notice.findOne({ where: { id } });
    if (!notice) {
      throw new NotFoundException('존재하지 않는 공지입니다.');
    }

    const deleteCount = await Notice.destroy({ where: { id } });
    if (!deleteCount) {
      throw new InternalServerErrorException(
        `${id} 공지 삭제 처리에 실패하였습니다.`
      );
    }

    return notice;
  },
};
