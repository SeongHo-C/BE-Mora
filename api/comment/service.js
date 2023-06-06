const { Comment, Board } = require('../../models');
const { updateComment, deleteComment } = require('./controller');

module.exports = {
  async setComment(content, board_id, commenter) {
    try {
      const board = await Board.findOne({
        where: { id: board_id },
      });

      if (!board) {
        throw new Error('존재하지 않은 게시판에는 댓글을 달 수 없습니다.');
      }

      await Comment.create({
        content,
        board_id,
        commenter,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async updateComment(content, comment_id, login_id) {
    try {
      const comment = await Comment.findOne({
        where: { id: comment_id },
      });

      if (comment.commenter !== login_id) {
        throw new Error('댓글을 작성한 사용자가 아닙니다.');
      }

      await Comment.update(
        {
          content,
        },
        {
          where: { id: comment_id },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteComment(comment_id, login_id) {
    try {
      const comment = await Comment.findOne({
        where: { id: comment_id },
      });

      if (comment.commenter !== login_id) {
        throw new Error('댓글을 작성한 사용자가 아닙니다.');
      }

      await Comment.destroy({
        where: { id: comment_id },
      });
    } catch (error) {
      throw new Error(err);
    }
  },
};
