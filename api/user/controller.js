const { addUser } = require('./service');

/**
 * 회원 컨트롤러
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
