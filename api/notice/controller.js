const noticeService = require('./service');

module.exports = {
  async addNotice(req, res) {
    const { title, content } = req.body;
    const adminId = req.currentId;
    res.status(201).json(
      await noticeService.addNotice({
        admin_id: adminId,
        title,
        content,
      })
    );
  },

  async getNotices(req, res) {
    const { page, size, keyword } = req.query;
    res.status(200).json(await noticeService.getNotices(page, size, keyword));
  },

  async setNotice(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const toUpdate = {
      ...(title && { title }),
      ...(content && { content }),
    };

    res.status(200).json(await noticeService.setNotice(id, toUpdate));
  },

  async deleteNotice(req, res) {
    const { id } = req.params;
    res.status(200).json(await noticeService.deleteNotice(id));
  },
};
