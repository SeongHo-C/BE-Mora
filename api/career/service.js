const Career = require('./model');

module.exports = {
  // 경력 조회
  async getCareer(userId) {
    const getCareer = await Career.findAll({
      where: { user_id: userId },
      attributes: [
        'id',
        'company_name',
        'position',
        'hire_date',
        'resign_date',
        'content',
      ],
    });

    const careersFormatted = getCareer.map((career) => {
      const hireDate = new Date(career.hire_date);
      const resignDate = career.resign_date
        ? new Date(career.resign_date)
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
      const { hire_date, resign_date, ...rest } = career.toJSON();

      return {
        ...rest,
        totalWorkingDate: totalMonths ? totalDate : '재직중', //총 개월 수가 null일시, '재직중'으로 표시.
      };
    });

    // workYear 속성 값이 있는 career를 필터링하여 정수로 변환
    const workYear = careersFormatted
      .filter((career) => !isNaN(parseInt(career.workYear)))
      .map((career) => parseInt(career.workYear));

    // 필터링된 workYear의 값 전체를 합하여 년차 계산
    const totalYear = {
      year: `${workYear.reduce((acc, curr) => acc + curr, 0)}년차`,
    };

    // career 객체로 이루어진 새로운 배열을 생성
    const detailCareer = careersFormatted.map(({ ...rest }) => rest);

    return { detailCareer, totalYear };
  },

  //경력 추가
  async addCareer(
    userId,
    company_name,
    position,
    hire_date,
    resign_date,
    content
  ) {
    console.log(position);
    const result = await Career.create({
      user_id: userId,
      company_name: company_name,
      position: position,
      hire_date: hire_date,
      resign_date: resign_date,
      content: content,
    });

    return result;
  },

  //경력 수정
  async updateCareer({
    id,
    company_name,
    position,
    hire_date,
    resign_date,
    content,
  }) {
    try {
      const updateCareer = await Career.update(
        {
          company_name,
          position,
          hire_date,
          resign_date,
          content,
        },
        { where: { id: id } }
      );
      return updateCareer;
    } catch (e) {
      throw new Error(e);
    }
  },

  //경력 삭제
  async deleteCareer({ id }) {
    try {
      const deleteCareer = await Career.destroy({
        where: { id: id },
      });
      return deleteCareer;
    } catch (e) {
      throw new Error(e);
    }
  },
};
