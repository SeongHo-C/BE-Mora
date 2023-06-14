const commentService = require('./service');

module.exports = {
  async setComment(req, res) {
    const { content, board_id } = req.body;
    const commenter = req.currentId;

    res
      .status(201)
      .json(await commentService.setComment(content, board_id, commenter));
  },

  async updateComment(req, res) {
    const { content, comment_id } = req.body;
    const userId = req.currentId;

    res
      .status(200)
      .json(await commentService.updateComment(content, comment_id, userId));
  },

  async deleteComment(req, res) {
    const { comment_id } = req.body;
    const userId = req.currentId;

    res
      .status(200)
      .json(await commentService.deleteComment(comment_id, userId));
  },
};
