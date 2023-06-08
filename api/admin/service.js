const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('./model');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addAdmin(adminInfo) {
    const { name, email, password } = adminInfo;
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdminInfo = { name, email, password: hashedPassword };
    return await Admin.create(newAdminInfo);
  },

  async getAdminToken(adminInfo) {
    const { email, password } = adminInfo;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new ForbiddenException('이메일 입력값이 올바르지 않습니다.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenException('비밀번호 입력값이 올바르지 않습니다.');
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ id: admin.id, role: 'admin' }, secretKey);
  },

  async getAdmins(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let admins = await Admin.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [
        ['name', 'ASC'],
        ['email', 'ASC'],
      ],
      offset,
      limit,
    });
    admins = getPagingData(admins, page, limit);

    return admins;
  },

  async setAdmin(email, toUpdate) {
    const { name, password } = toUpdate;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }

    const newPasswordHash = await bcrypt.hash(password, 10);
    const updateCount = await Admin.update(
      {
        name,
        password: newPasswordHash,
      },
      {
        where: { email },
        returning: true,
      }
    );
    if (!updateCount) {
      throw new InternalServerErrorException(
        `${name} 관리자 정보 수정 처리에 실패했습니다.`
      );
    }

    return await Admin.findOne({ where: { email } });
  },

  async deleteAdmin(email) {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException('존재하지 않는 관리자 이메일입니다.');
    }

    const deleteCount = await Admin.destroy({ where: { email } });
    if (!deleteCount) {
      throw new InternalServerErrorException(
        `${email} 관리자 정보 삭제 처리에 실패했습니다.`
      );
    }
    return admin;
  },
};
