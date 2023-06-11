const adminBoardService = require('./service');

module.exports = {
  async getBoards(req, res) {
    const { page, size, keyword } = req.query;
    res
      .status(200)
      .json(await adminBoardService.getBoards(page, size, keyword));
  },

  async getDetail(req, res) {
    const { id } = req.params;
    res.status(200).json(await adminBoardService.getDetail(id));
  },

  async deleteBoard(req, res) {
    const { id } = req.params;
    res.status(200).json(await adminBoardService.deleteBoard(id));
  },

  async deleteComment(req, res) {
    const { id } = req.params;
    res.status(200).json(await adminBoardService.deleteComment(id));
  },
};
