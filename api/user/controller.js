const userService = require('./service');
module.exports = {
  /**
   * 회원가입
   */
  async addUser(req, res) {
    const { name, email, password } = req.body;
    const userInfo = { name, email, password };

    const createdResult = await userService.addUser(userInfo);
    if (!createdResult) {
      return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
    }
    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  },

  /**
   *  회원 로그인
   */
  async getUserToken(req, res) {
    const { email, password } = req.body;

    const result = await userService.getUserToken({
      email,
      password,
    });

    if (!result) {
      return res
        .status(400)
        .json({ message: '아이디 또는 비밀번호를 확인해주세요.' });
    }

    const { accessToken, refreshToken } = result;

    return res.status(201).json({
      token: accessToken,
      refreshToken: refreshToken,
      message: '로그인에 성공하셨습니다!',
    });
  },

  /**
   * 회원 탈퇴
   */
  async deleteUser(req, res) {
    const { password } = req.body;
    const loginId = req.currentId;
    const deleteResult = await userService.deleteUser(loginId, password);
    if (!deleteResult) {
      res.status(400).json({ message: '비밀번호가 일치하지않습니다.' });
    }
    return res.status(201).json({ message: '탈퇴가 완료되었습니다.' });
  },
};
