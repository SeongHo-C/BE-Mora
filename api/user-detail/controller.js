const userDetailService = require('./service');
const jwt = require('jsonwebtoken');
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
    const { userName, userImg, position, intro, phase, track, profile_public } =
      req.body;
    const userId = req.currentId;

    const updatedResult = await userDetailService.setProfile(
      userId,
      userName,
      userImg,
      position,
      intro,
      phase,
      track,
      profile_public
    );
    if (!updatedResult) {
      res.status(400).json({
        message: '프로필 업데이트에 실패했습니다. 다시 시도해주세요.',
      });
    }
    res.status(200).json({ message: '변경되었습니다.' });
  },

  /**
   * 내가 쓴 글 조회
   */
  async getMyBoard(req, res) {
    const id = req.currentId;
    return res.status(200).json(await userDetailService.getMyBoard(id));
  },

  /**
   * 오픈 프로필 조회
   */

  async getOpenProfile(req, res) {
    const id = req.currentId;
    return res.status(200).json(await userDetailService.getOpenProfiles(id));
  },

  /**
   * 오픈 프로필 공개/비공개 수정
   */
  async setOpenProfile(req, res) {
    const { open } = req.body;
    const id = req.currentId;

    await userDetailService.setOpenProfile(id, open);

    return res.status(200).json({ open });
    // if (open === 0) {
    //   await userDetailService.setOpenProfile(id, open);
    //   return res.status(200).json({ open: 0 });
    // } else if (open === 1) {
    //   await userDetailService.setOpenProfile(id, open);
    //   return res.status(200).json({ open: 1 });
    // }
  },

  /**
   * 오픈 프로필 검색어 조회
   */
  async getOpenProfileByKeyword(req, res) {
    const { keyword } = req.query;
    console.log(keyword);
    return res
      .status(200)
      .json(await userDetailService.getOpenProfileByKeyword(keyword));
  },
};
