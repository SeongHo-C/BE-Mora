const { addUser, getUserToken } = require('./service');

/**
 * 회원가입
 */
exports.addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userInfo = { name, email, password };
  try {
    await addUser(userInfo);
    return res.status(201).json({
      message: '회원가입에 성공했습니다!',
    });
  } catch (e) {
    next(e);
  }
};

/**
 *  회원 로그인
 */
exports.getUserToken = async (req, res, next) => {
  const { email, password } = req.body;
  await getUserToken({ email, password });
  try {
    const token = await getUserToken({ email, password });
    return res.status(201).json(token);
  } catch (e) {
    next(e);
  }
};
