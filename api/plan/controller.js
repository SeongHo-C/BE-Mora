const planService = require('./service');

module.exports = {
  async addPlan(req, res) {
    const { title, content, start_date, end_date, links } = req.body;
    const adminId = req.currentId;
    res
      .status(201)
      .json(
        await planService.addPlan(
          { admin_id: adminId, title, content, start_date, end_date },
          links
        )
      );
  },
};
