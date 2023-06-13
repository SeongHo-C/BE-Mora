const Education = require('./model');

module.exports = {
  /**
   * 교육 조회
   */
  async getEducation(id) {
    const getEducation = await Education.findAll({
      where: { user_id: id },
      attributes: [
        'id',
        'name',
        'program',
        'start_date',
        'end_date',
        'description',
      ],
    });

    return getEducation;
  },

  /**
   * 교육 추가
   */
  async setEducation(userId, edu_name, program, start_date, end_date, content) {
    const result = await Education.create({
      user_id: userId,
      name: edu_name,
      program: program,
      start_date: start_date,
      end_date: end_date,
      description: content,
    });
    return result;
  },

  /**
   * 교육 삭제
   */
  async deleteEducation(id) {
    const deleted = await Education.destroy({
      where: { id: id },
    });
    return deleted;
  },
};
