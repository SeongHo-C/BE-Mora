const { Comment, Board } = require('../../models');
const { BadRequestClass, UnauthorizedClass } = require('../../middlewares');
const alertService = require('../alert/service');

module.exports = {
  async setComment(content, board_id, commenter) {
    const board = await Board.findOne({
      where: { id: board_id },
    });

    if (!board) {
      throw new BadRequestClass(
        '존재하지 않은 게시판에는 댓글을 달 수 없습니다.'
      );
    }

    await Comment.create({
      content,
      board_id,
      commenter,
    });

    const from_user_id = commenter;
    const to_user_id = board.writer;
    const type = 'COMMENT';
    const url = board_id;

    await alertService.addAlert({ from_user_id, to_user_id, type, url });
  },

  async updateComment(content, id, userId) {
    const comment = await Comment.findOne({
      where: { id },
    });

    if (comment.commenter !== userId) {
      throw new UnauthorizedClass(
        '댓글을 작성한 사용자가 아니면 수정하실 수 없습니다.'
      );
    }

    await Comment.update(
      {
        content,
      },
      {
        where: { id },
      }
    );
  },

  async deleteComment(id, userId) {
    const comment = await Comment.findOne({
      where: { id },
    });

    if (comment.commenter !== userId) {
      throw new UnauthorizedClass(
        '댓글을 작성한 사용자가 아니면 삭제하실 수 없습니다.'
      );
    }

    await Comment.destroy({
      where: { id },
    });
  },
};
