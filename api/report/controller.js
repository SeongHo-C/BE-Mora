const reportService = require('./service');

const reportController = {
  async addReport(req, res) {
    const { type, to_user_id, target_id, content } = req.body;
    const from_user_id = req.currentId;
    const newReport = await reportService.addReport({
      type,
      from_user_id,
      to_user_id,
      target_id,
      content,
    });
    res.status(201).json(newReport);
  },

  async getAllReports(req, res) {
    const reports = await reportService.getAllReports();
    res.status(201).json(reports);
  },

  async getUserReports(req, res) {
    const reports = await reportService.getUserReports(req.currentId);
    res.status(201).json(reports);
  },

  async getReports(req, res) {
    const { keyword } = req.params;
    const reports = await reportService.getReports(keyword);
    res.status(201).json(reports);
  },
};

module.exports = reportController;
