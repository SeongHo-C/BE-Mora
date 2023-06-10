const commentService = require('./service');

module.exports = {
  async setComment(req, res) {
    const { content, board_id } = req.body;
    const commenter = req.currentId;

    await commentService.setComment(content, board_id, commenter);
    res.status(201).json('댓글 작성 성공');
  },

  async updateComment(req, res) {
    const { content, comment_id } = req.body;
    const userId = req.currentId;

    await commentService.updateComment(content, comment_id, userId);
    res.status(200).json('댓글 수정 완료');
  },

  async deleteComment(req, res) {
    const { comment_id } = req.body;
    const login_id = req.currentId;

    await commentService.deleteComment(comment_id, login_id);
    res.status(200).json('댓글 삭제 완료');
  },
};
