const { Like, Board } = require('../../models');
const { NotFoundException } = require('../../middlewares');

module.exports = {
  async setLike(boardId, userId) {
    const board = await Board.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(
        '존재하지 않는 게시판에는 좋아요를 등록할 수 없습니다.'
      );
    }

    await Like.create({
      board_id: boardId,
      user_id: userId,
    });
  },

  async deleteLike(boardId, userId) {
    const board = await Board.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(
        '존재하지 않는 게시판에는 좋아요를 삭제할 수 없습니다.'
      );
    }

    const like = await Like.findOne({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });

    if (!like) {
      throw new NotFoundException('등록되지 않은 좋아요를 삭제할 수 없습니다.');
    }

    await Like.destroy({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });
  },
};
