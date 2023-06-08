const { Skill, UserSkill } = require('./model');
const { Op } = require('sequelize');
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
    const userSkills = await UserSkill.findAll({
      where: { user_id: userId },
      include: {
        model: Skill,
        attributes: ['name'],
      },
    });

    // 스킬 name을 추출하여 배열로 반환
    const skillNames = userSkills.map((userSkill) => userSkill.Skill.name);

    return skillNames;
  },

  /**
   * 유저 스킬 업데이트
   */
  async updateUserSkills(userId, skillNames) {
    // 기존 스킬 삭제
    const userSkillCheck = await UserSkill.findAll({
      where: { user_id: userId },
    });
    if (userSkillCheck) {
      await UserSkill.destroy({
        where: { user_id: userId },
      });
    }

    await UserSkill.destroy({ where: { user_id: userId } });

    // 새로운 유저 스킬 등록
    const userSkills = await Promise.all(
      skillNames.map(async (skillName) => {
        // console.log(skillName);
        const skill = await Skill.findOne({ where: { name: skillName } });
        return {
          id: skill.id,
          name: skill.name,
        };
      })
    );
    console.log('----');
    console.log(userSkills);
    console.log('----');
    const result = await UserSkill.bulkCreate(
      userSkills.map((userSkills) => ({
        skill_id: userSkills.id,
        user_id: userId,
      }))
    );
    // const result = await UserSkill.bulkCreate(userSkills);
    return result;
  },

  // 유저 스킬 전체 삭제
  async deleteUserSkills(userId) {
    try {
      await UserSkill.destroy({ where: { user_id: userId } });
    } catch (e) {
      throw new Error('유저 스킬 삭제에 실패했습니다.');
    }
  },
};
