const { Alert, Plan, User, Comment, Board } = require('../../models');
const { Op } = require('sequelize');
const { getPagination, getPagingData, sendMail } = require('../../utils');
const {
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addAlert(alertInfo) {
    const { from_user_id, to_user_id, type } = alertInfo;
    let fromUser;
    let toUser;
    if (type === 'COMMENT') {
      fromUser = await Comment.findOne({
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
        where: { commenter: from_user_id },
      });
      toUser = await Board.findOne({
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
        where: { writer: to_user_id },
      });
    } else if (type === 'PLAN') {
    } else if (type === 'COFFEECHAT') {
      // fromUser = await Coffechat({});
      toUser = await User.findOne({
        where: { id: to_user_id },
      });
    }
    console.log('type, fromUser, toUser:', type, fromUser, toUser);
    if (!fromUser || !toUser) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const alert = await Alert.create(alertInfo);
    if (!alert) {
      throw new InternalServerErrorException(
        `${id} 알림 등록 처리에 실패하였습니다.`
      );
    }

    return alert;
  },
};
