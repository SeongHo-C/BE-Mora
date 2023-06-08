const { Like, Board } = require('../../models');
const { ForbiddenClass, NotFoundClass } = require('../../middlewares');

module.exports = {
  async setLike(boardId, userId) {
    const board = await Board.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundClass(
        '존재하지 않는 게시판에는 좋아요를 할 수 없습니다.'
      );
    }

    await Like.create({
      board_id: boardId,
      user_id: userId,
    });
  },
};
