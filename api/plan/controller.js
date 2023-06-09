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

  async getYearMonth(req, res) {
    const { yearMonth } = req.params;
    res.status(200).json(await planService.getYearMonth(yearMonth));
  },

  async getYearMonthDay(req, res) {
    const { yearMonthDay } = req.params;
    res.status(200).json(await planService.getYearMonthDay(yearMonthDay));
  },
};
