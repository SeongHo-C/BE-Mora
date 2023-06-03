const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('./model');
const { Op } = require('sequelize');

const adminService = {
  async addAdmin(adminInfo) {
    const { name, email, password } = adminInfo;
    const admin = await Admin.findOne({ where: { email: email } });
    if (admin) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
      );
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
      throw new Error('이메일 정보가 맞지 않습니다. 다시 한 번 확인해 주세요.');
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호 정보가 맞지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: admin.id }, secretKey);

    return token;
  },

  async getAdmin(id) {
    const admin = await Admin.findOne({ where: { id: id } });
    if (!admin) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return admin;
  },

  async getAdmins(adminInfo) {
    const admins = await Admin.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${adminInfo}%` } },
          { email: { [Op.like]: `%${adminInfo}%` } },
        ],
      },
    });
    return admins;
  },

  async setAdmin(email, toUpdate) {
    const { name, password } = toUpdate;
    let admin = await Admin.findAll({ where: { email: email } });
    if (!admin) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const newPasswordHash = await bcrypt.hash(password, 10);

    admin = Admin.update(
      {
        name: name,
        password: newPasswordHash,
      },
      {
        where: { email: email },
      }
    );

    return admin;
  },

  async deleteAdmin(email) {
    const deleteCount = await Admin.destroy({ where: { email: email } });
    if (deleteCount < 1) {
      throw new Error(`${email} 관리자 탈퇴 처리에 실패하였습니다.`);
    }
    return deleteCount;
  },
};

module.exports = adminService;
