const Profile = require('./model');
const User = require('../user/model');
const { BadRequestClass, NotFoundClass } = require('../../middlewares');

module.exports = {
  /**
   * 프로필 조회
   */
  async getProfile(userId) {
    const userProfile = await Profile.findOne({ user_id: userId });
    const userName = await User.findOne({
      where: { id: userId },
      attributes: ['name'],
    });

    if (!userProfile || !userName) {
      throw new NotFoundClass('존재하지 않는 유저입니다.');
    }
    console.log(userName);
    return { userProfile, userName };
  },

  /**
   * 이름, 직함, 소개 수정
   */
  async setProfile(userId, name, position, comment, img) {
    const user = await Profile.findOne({ user_id: userId });
    if (!user) {
      throw new NotFoundClass('존재하지 않는 유저입니다.');
    }

    // 유저 테이블 name 변경
    const updateName = await User.update(
      { name: name },
      { where: { id: userId } }
    );

    const updateProfile = await Profile.update(
      { position: position, comment: comment, img_path: img },
      { where: { user_id: userId } }
    );
    if (!updateProfile || !updateName) {
      throw new BadRequestClass('프로필 수정 처리에 실패했습니다.');
    }

    return updateProfile;
  },
};
