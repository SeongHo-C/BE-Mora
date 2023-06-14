const { Coffeechat, User } = require('../../models');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');
const mailer = require('../../utils/send-mail');

module.exports = {
  async addCoffeechat(profile_id, user_id) {
    const users = await Coffeechat.findOne({ where: { profile_id, user_id } });
    if (users) {
      throw new BadRequestException('이미 신청된 커피챗입니다.');
    }

    const coffeechat = await Coffeechat.create({ profile_id, user_id });
    if (!coffeechat) {
      throw new InternalServerErrorException('커피챗 생성에 실패하였습니다.');
    }

    const profile = await User.findOne({
      where: { id: profile_id },
      attributes: ['name', 'email'],
      raw: true,
    });

    const user = await User.findOne({
      where: { id: user_id },
      attributes: ['name', 'email'],
      raw: true,
    });

    mailer.sendGmail(
      profile.email,
      `모여라 레이서 : ${profile.name}님께 커피챗 신청이 왔습니다.`,
      `${user.name}님이 커피챗을 신청했습니다.`,
      `${user.name}님 email ${user.email}`
    );

    return coffeechat;
  },
};
