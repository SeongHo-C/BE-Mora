const { Alert, User, Comment, Board } = require('../../models');
const {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} = require('../../middlewares');

module.exports = {
  async addAlert(alertInfo) {
    const { from_user_id, to_user_id, type, url } = alertInfo;
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
    }

    if (!fromUser || !toUser) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const alert = await Alert.create(alertInfo);
    if (!alert) {
      throw new InternalServerErrorException(
        `${id} 알림 등록 처리에 실패하였습니다.`
      );
    }

    return await Alert.findOne({
      include: [
        {
          model: User,
          as: 'AlertFromUser',
          attributes: ['name', 'email'],
          include: [
            {
              model: Comment,
              attributes: ['content'],
              where: { board_id: url },
            },
          ],
        },
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
          include: [
            {
              model: Board,
              attributes: ['title', 'content'],
            },
          ],
        },
      ],
      where: {
        id: alert.id,
      },
    });
  },

  async setAlert(id, toUser, checked) {
    const alert = await Alert.findOne({
      where: { id, to_user_id: toUser },
      raw: true,
    });
    if (!alert) {
      throw new NotFoundException(
        '존재하지 않는 알림이거나 알림 당사자가 아닌 사용자의 요청입니다.'
      );
    }

    if (alert.checked === 0 && checked === true) {
      const updateCount = await Alert.update(
        {
          checked,
        },
        { where: { id } }
      );
      if (!updateCount) {
        throw new InternalServerErrorException(
          `${id} 알림 확인 여부 수정 처리에 실패하였습니다.`
        );
      }
    } else {
      throw new BadRequestException(
        '이미 읽은 알림은 다시 수정할 수 없습니다.'
      );
    }

    return await Alert.findOne({
      include: [
        {
          model: User,
          as: 'AlertFromUser',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'AlertToUser',
          attributes: ['name', 'email'],
        },
      ],
      where: {
        id: alert.id,
      },
    });
  },
};
