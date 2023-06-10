const { Comment, Board } = require('../../models');
const { BadRequestClass, UnauthorizedClass } = require('../../middlewares');

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
  },

  async updateComment(content, comment_id, login_id) {
    const comment = await Comment.findOne({
      where: { id: comment_id },
    });

    if (comment.commenter !== login_id) {
      throw new UnauthorizedClass(
        '댓글을 작성한 사용자가 아니면 수정하실 수 없습니다.'
      );
    }

    await Comment.update(
      {
        content,
      },
      {
        where: { id: comment_id },
      }
    );
  },

  async deleteComment(comment_id, login_id) {
    const comment = await Comment.findOne({
      where: { id: comment_id },
    });

    if (comment.commenter !== login_id) {
      throw new UnauthorizedClass(
        '댓글을 작성한 사용자가 아니면 삭제하실 수 없습니다.'
      );
    }

    await Comment.destroy({
      where: { id: comment_id },
    });
  },
};
