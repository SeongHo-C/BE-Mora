const { addUser, getUserToken } = require('./service');
module.exports = {
  /**
   * 회원가입
   */
  async addUser(req, res) {
    const { name, email, password } = req.body;
    const userInfo = { name, email, password };

    const createdResult = await addUser(userInfo);
    return res.status(201).json(createdResult);
  },

  /**
   *  회원 로그인
   */
  async getUserToken(req, res) {
    const { email, password } = req.body;

    const token = await getUserToken({ email, password });
    return res.status(201).json(token);
  },
};
