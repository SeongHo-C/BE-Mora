const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('./model');
const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../../utils');
const { BadRequestClass, ForbiddenClass } = require('../../middlewares');

module.exports = {
  async addAdmin(adminInfo) {
    const { name, email, password } = adminInfo;
    const admin = await Admin.findOne({ where: { email: email } });
    if (admin) {
      throw new BadRequestClass('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdminInfo = { name, email, password: hashedPassword };
    const createdNewAdmin = await Admin.create(newAdminInfo);

    return createdNewAdmin;
  },

  async getAdminToken(adminInfo) {
    const { email, password } = adminInfo;
    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
      throw new ForbiddenClass('이메일 입력값이 올바르지 않습니다.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      throw new ForbiddenClass('비밀번호 입력값이 올바르지 않습니다.');
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: admin.id, role: 'admin' }, secretKey);

    return token;
  },

  async getAdmins(page, size, keyword) {
    const { limit, offset } = getPagination(page, size);
    let admins;
    if (!keyword || keyword === ':keyword') {
      admins = await Admin.findAndCountAll({
        order: [
          ['name', 'ASC'],
          ['email', 'ASC'],
        ],
        offset,
        limit,
      });
    } else {
      admins = await Admin.findAndCountAll({
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
    }
    admins = getPagingData(admins, page, limit);

    return admins;
  },

  async setAdmin(email, toUpdate) {
    const { name, password } = toUpdate;
    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
      throw new ForbiddenClass('존재하지 않는 이메일입니다.');
    }

    const newPasswordHash = await bcrypt.hash(password, 10);
    const updateCount = Admin.update(
      {
        name: name,
        password: newPasswordHash,
      },
      {
        where: { email: email },
      }
    );
    if (updateCount < 1) {
      throw new BadRequestClass(
        `${name} 관리자 정보 수정 처리에 실패했습니다.`
      );
    }

    return updateCount;
  },

  async deleteAdmin(email) {
    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
      throw new ForbiddenClass('존재하지 않는 관리자 이메일입니다.');
    }

    const deleteCount = await Admin.destroy({ where: { email: email } });
    if (deleteCount < 1) {
      throw new BadRequestClass(
        `${email} 관리자 정보 삭제 처리에 실패했습니다.`
      );
    }
    return deleteCount;
  },
};
