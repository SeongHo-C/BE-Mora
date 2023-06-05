const { Comment, Board } = require('../../models');

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
};
