const UserDetail = require('./model');
const User = require('../user/model');
const { BadRequestException, NotFoundException } = require('../../middlewares');

module.exports = {
  /**
   * 프로필 조회
   */
  async getProfile(userId) {
    const user = await User.findOne({
      include: {
        model: UserDetail,
      },
      where: { id: userId },
      attributes: ['name'],
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    console.log(user);
    return user;
  },

  /**
   * 이름, 직함, 소개, 사진 수정
   */
  async setProfile(userId, userName, userImg, position, intro, phase, track) {
    const user = await UserDetail.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    const generation_id = phase + ' ' + track;
    console.log(generation_id);
    // 유저 테이블 name 변경
    const updateName = await User.update(
      { name: userName },
      { where: { id: userId } }
    );

    const updateProfile = await UserDetail.update(
      {
        position: position,
        comment: intro,
        img_path: userImg,
        generation_id: generation_id,
      },
      { where: { user_id: userId } }
    );
    if (!updateProfile || !updateName) {
      return;
    }

    return updateProfile;
  },
};
