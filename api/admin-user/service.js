const bcrypt = require('bcrypt');
const { User, UserDetail } = require('../../models');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addUser(userInfo) {
    const { name, email, password } = userInfo;
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { name, email, password: hashedPassword };
    return await User.create(newUserInfo);
  },

  async getUsers(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let users = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    users = getPagingData(users, page, limit);

    return users;
  },

  async getDetail(id) {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: UserDetail,
          attributes: ['img_path'],
        },
      ],
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    return user;
  },

  async setUser(email, toUpdate) {
    const { name, password } = toUpdate;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }

    const newPasswordHash = await bcrypt.hash(password, 10);
    const updateCount = await User.update(
      {
        name,
        password: newPasswordHash,
      },
      {
        where: { email },
      }
    );
    if (!updateCount) {
      throw new InternalServerErrorException(
        `${name} 사용자 정보 수정 처리에 실패했습니다.`
      );
    }

    return await User.findOne({ where: { email } });
  },

  async deleteUser(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자 이메일입니다.');
    }

    const deleteCount = await User.destroy({ where: { email } });
    if (!deleteCount) {
      throw new InternalServerErrorException(
        `${email} 사용자 정보 삭제 처리에 실패했습니다.`
      );
    }

    return user;
  },
};
