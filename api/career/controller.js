const careerService = require('./service');

module.exports = {
  /**
   * 경력 조회
   */
  async getCareer(req, res) {
    const id = req.currentId;
    res.status(200).json(await careerService.getCareer(id));
  },

  /**
   * 경력 추가
   */
  async addCareer(req, res) {
    const { company_name, position, hire_date, resign_date, content } =
      req.body;
    const userId = req.currentId;
    const newCareer = await careerService.addCareer(
      userId,
      company_name,
      position,
      hire_date,
      resign_date,
      content
    );
    res.status(201).json(newCareer);
  },

  /**
   * 경력 수정
   */
  async updateCareer(req, res) {
    const { id, company_name, position, hire_date, resign_date, content } =
      req.body;
    const newCareer = await careerService.updateCareer({
      userId,
      id,
      company_name,
      position,
      hire_date,
      resign_date,
      content,
    });
    res.status(200).json(newCareer);
  },

  /**
   * 경력 삭제
   */
  async deleteCareer(req, res) {
    const { id } = req.body;
    await careerService.deleteCareer(id);
    res.status(200).json({ message: '삭제되었습니다.' });
  },
};
