const educationService = require('./service');

module.exports = {
  /**
   * 교육 조회
   */
  async getEducation(req, res) {
    const id = req.currentId;
    res.json(await educationService.getEducation(id));
  },

  /**
   * 교육 추가
   */
  async addEducation(req, res) {
    const { edu_name, program, start_date, end_date, content } = req.body;
    const userId = req.currentId;

    res
      .status(201)
      .json(
        await educationService.setEducation(
          userId,
          edu_name,
          program,
          start_date,
          end_date,
          content
        )
      );
  },

  /**
   * 교육 수정
   */
  async updateEducation(req, res) {
    const { id, edu_name, program, start_date, end_date, content } = req.body;
    const editEducation = await educationService.updateCareer(
      id,
      edu_name,
      program,
      start_date,
      end_date,
      content
    );
    res.status(201).json(editEducation);
  },

  /**
   * 교육 삭제
   */
  async deleteEducation(req, res) {
    const { id } = req.body;
    await educationService.deleteCareer(id);
    res.status(200).json({ message: '삭제되었습니다.' });
  },
};
