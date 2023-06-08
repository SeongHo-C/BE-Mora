const likeService = require('./service');

module.exports = {
  async setLike(req, res) {
    const { board_id } = req.body;
    const loginId = req.currentId;

    await likeService.setLike(board_id, loginId);
    res.status(201).json('게시글 좋아요 등록');
  },
};
