const alertService = require('./service');

module.exports = {
  async addAlert(req, res) {
    const { from_user_id, to_user_id, type, url } = req.body;
    res
      .status(201)
      .json(
        await alertService.addAlert({ from_user_id, to_user_id, type, url })
      );
  },
};
