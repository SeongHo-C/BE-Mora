const Quiz = require('./model');

/**
 * 모든 퀴즈 조회
 * @returns 모든 퀴즈 return
 */
module.exports = {
  async getAllQuiz() {
    const getQuiz = await Quiz.findAll({
      attributes: ['question', 'answer', 'hint'],
    });
    return getQuiz;
  },
};
