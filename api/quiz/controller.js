const quizSerivce = require('./service');

/**
 * 퀴즈 컨트롤러
 */
module.exports = {
  /**
   * 퀴즈 불러오기
   */
  async getAllQuiz(req, res) {
    const getQuiz = await quizSerivce.getAllQuiz();
    res.status(200).json(getQuiz);
  },
};
