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
   *  이미지 업로드
   */
  async uploadImage(req, res) {
    res.status(201).json({ file_name: req.file.filename });
  },

  /**
   * 이름, 사진, 직책, 직함, 소개, 기수 수정
   */
  async setProfile(req, res) {
    const { userName, userImg, position, intro, phase, track } = req.body;
    const userId = req.currentId;

    const updatedResult = await userDetailService.setProfile(
      userId,
      userName,
      userImg,
      position,
      intro,
      phase,
      track
    );
    if (!updatedResult) {
      res.status(400).json({
        message: '프로필 업데이트에 실패했습니다. 다시 시도해주세요.',
      });
    }
    res.status(200).json({ message: '변경되었습니다.' });
  },
};
