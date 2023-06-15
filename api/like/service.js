const { Like, Board } = require('../../models');
const { NotFoundException, BadRequestException } = require('../../middlewares');

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

    const like = await Like.findOne({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });

    if (like) {
      throw new BadRequestException(
        '게시글에 좋아요는 한 번만 가능해야 합니다.'
      );
    }

    await Like.create({
      board_id: boardId,
      user_id: userId,
    });

    return '좋아요 등록 완료';
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
      throw new BadRequestException(
        '등록되지 않은 좋아요를 삭제할 수 없습니다.'
      );
    }

    await Like.destroy({
      where: {
        board_id: boardId,
        user_id: userId,
      },
    });

    return '좋아요 삭제 완료';
  },
};
