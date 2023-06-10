const planService = require('./service');

module.exports = {
  async addPlan(req, res) {
    const { title, content, start_date, end_date, links } = req.body;
    res
      .status(201)
      .json(
        await planService.addPlan(
          { admin_id: req.currentId, title, content, start_date, end_date },
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

  async setPlan(req, res) {
    const { id } = req.params;
    const { title, content, start_date, end_date, links } = req.body;
    const toUpdate = {
      ...(title && { title }),
      ...(content && { content }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date }),
    };
    res.status(200).json(await planService.setPlan(id, toUpdate, links));
  },

  async deletePlan(req, res) {
    const { id } = req.params;
    res.status(200).json(await planService.deletePlan(id));
  },
};
