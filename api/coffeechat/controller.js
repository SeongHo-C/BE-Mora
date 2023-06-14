const coffeechatService = require('./service');

module.exports = {
  async addCoffeechat(req, res) {
    const { profile_id } = req.body;
    res
      .status(201)
      .json(await coffeechatService.addCoffeechat(profile_id, req.currentId));
  },
};
