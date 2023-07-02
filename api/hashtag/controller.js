const hashtagService = require('./service');

module.exports = {
  async getHashtags(req, res) {
    const { keyword } = req.query;

    res.status(200).json(await hashtagService.getHashtags(keyword));
  },
};
