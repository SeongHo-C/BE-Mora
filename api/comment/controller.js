const commentService = require('./service');

module.exports = {
  async setComment(req, res, next) {
    const { content, board_id } = req.body;
    const commenter = req.currentId;

    try {
      await commentService.setComment(content, board_id, commenter);
      res.status(201).json('댓글 작성 성공');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
