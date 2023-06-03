const noticeService = require('./service');

const noticeController = {
  async addNotice(req, res) {
    const { title, content } = req.body;
    const admin_id = req.currentId;
    const newNotice = await noticeService.addNotice({
      admin_id,
      title,
      content,
    });
    res.status(201).json(newNotice);
  },

  async getNotices(req, res) {
    const { keyword } = req.params;
    const notices = await noticeService.getNotices(keyword);
    res.status(201).json(notices);
  },
};

module.exports = noticeController;
