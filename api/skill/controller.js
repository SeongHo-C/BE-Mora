const skillService = require('./service');

module.exports = {
  /**
   * 입력된 내용이 ex) no 일경우 node.js 등 문자가 포함된 결과 값 조회
   */
  async getSkill(req, res) {
    const keyword = req.query.keyword;
    res.status(200).json(await skillService.getSkill(keyword));
  },

  /**
   * 로그인 사용자 스킬 조회
   */
  async getUserSkills(req, res) {
    const userId = req.currentId;
    res.status(200).json(await skillService.getUserSkills(userId));
  },

  // 유저의 사용자 업데이트
  async updateUserSkills(req, res) {
    const skillNames = req.body.skillNames || []; // 요청 본문에서 skillNames 배열 추출, 빈 배열로 초기화
    const userId = req.currentId;

    if (skillNames.length > 0) {
      await skillService.updateUserSkills(userId, skillNames);
      res.status(200).json({ message: '스킬 업데이트 완료' });
    } else {
      await skillService.deleteUserSkills(userId);
      res.status(200).json({ message: '스킬 전체 삭제 완료' });
    }
  },
};
