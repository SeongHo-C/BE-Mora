const alertService = require('./service');

module.exports = {
  async addAlert(req, res) {
    const { from_user_id, to_user_id, type, target_id } = req.body;
    res.status(201).json(
      await alertService.addAlert({
        from_user_id,
        to_user_id,
        type,
        target_id,
      })
    );
  },

  async setAlert(req, res) {
    const { id } = req.params;
    const { checked } = req.body;
    res
      .status(200)
      .json(await alertService.setAlert(id, req.currentId, checked));
  },

  async getAlerts(req, res) {
    res.status(200).json(await alertService.getAlerts());
  },
};
