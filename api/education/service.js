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

    const careersFormatted = getEducation.map((education) => {
      const hireDate = new Date(education.start_date);
      const resignDate = education.end_date
        ? new Date(education.end_date)
        : null;

      // hire_date와 resign_date가 존재하면 개월 수 계산
      const totalMonths = resignDate
        ? (resignDate.getFullYear() - hireDate.getFullYear()) * 12 +
          (resignDate.getMonth() - hireDate.getMonth())
        : null;

      // totalMonths로 년, 월 계산
      const years = totalMonths ? Math.floor(totalMonths / 12) : null;
      const remainingMonths = totalMonths ? totalMonths % 12 : null;

      // 근무 년,월
      let totalDate = '';
      if (years > 0) {
        totalDate += `${years}년`;
      }
      if (remainingMonths > 0) {
        totalDate += ` ${remainingMonths}개월`;
      }

      // hire_date와 resign_date 제외
      const { hire_date, resign_date, ...rest } = education.toJSON();

      return {
        ...rest,
        totalWorkingDate: totalMonths ? totalDate : '재직중', //총 개월 수가 null일시, '재직중'으로 표시.
      };
    });
    const detailEducation = careersFormatted.map(({ ...rest }) => rest);
    return detailEducation;
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
};
