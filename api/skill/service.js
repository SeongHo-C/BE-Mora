const Skill = require('./model');
const { Op } = require('sequelize');
const db = require('../../models');
/**
 *  스킬 서비스
 */
module.exports = {
  /**
   * 스킬 조회 , 입력된 내용이 ex) "no" 일경우 node.js 등 문자가 포함된 결과 값 조회
   */
  async getSkill(keyword) {
    // 스킬 조회 쿼리
    const skills = await Skill.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      },
      attributes: ['name'],
    });
    if (skills.length === 0) {
      return [];
    }
    return skills;
  },

  // 유저 스킬 조회
  async getUserSkills(userId) {
    // 유저와 연결된 UserSkill 모델을 사용하여 스킬 데이터를 조회합니다.
    const userSkills = await db.sequelize.models.user_skills.findAll({
      where: { user_id: userId },
      attributes: ['SkillId'],
    });

    const skillIds = userSkills.map((userSkill) => userSkill.SkillId);

    const skills = await Promise.all(
      skillIds.map((id) =>
        Skill.findOne({ where: { id }, attributes: ['name'] })
      )
    );

    // 스킬 name을 추출하여 배열로 반환
    const skillNames = skills.map((skill) => skill.dataValues.name);

    return skillNames;
  },

  /**
   * 유저 스킬 업데이트
   */
  async updateUserSkills(userId, skillNames) {
    const user = await db.User.findOne({ where: { id: userId } });

    const result = await Promise.all(
      skillNames.map((skill) => {
        return db.Skill.findOrCreate({
          where: { name: skill },
        });
      })
    );
    await user.setSkills(result.map((r) => r[0]));

    return user;
  },
};
