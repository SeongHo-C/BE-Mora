const jwt = require('jsonwebtoken');
const userDetailService = require('./service');

module.exports = {
  /**
   * 내 프로필 조회
   */
  async getProfile(req, res) {
    const id = req.currentId;
    const profile = await userDetailService.getProfile(id);
    return res.status(200).json(profile);
  },

  /**
   * 이름, 직함, 소개 수정
   * @param name - 이름
   * @param position - 직함
   * @param comment - 소개
   */
  async setProfile(req, res) {
    const { name, position, comment } = req.body;
    const userId = req.currentId;

    const updatedResult = await userDetailService.setProfile(
      userId,
      name,
      position,
      comment
    );
    return res.status(200).json(updatedResult);
  },
};
