const linkService = require('./service');

module.exports = {
  /**
   * 링크 조회
   */
  async getLinks(req, res) {
    const id = req.currentId;
    res.status(200).json(await linkService.getLinks(id));
  },

  /**
   * 링크 추가
   */
  async addLink(req, res) {
    const id = req.currentId;
    const { url, name } = req.body;
    res.status(200).json(await linkService.createLink(id, url, name));
  },

  /**
   * 링크 수정
   */
  async updateLink(req, res) {
    const id = req.currentId;
    const { linkId, url, name } = req.body;
    res.status(200).json(await linkService.updateLink(id, linkId, url, name));
  },

  /**
   * 링크 삭제
   */
  async deleteLink(req, res) {
    const id = req.currentId;
    const { linkId } = req.body;
    res.status(200).json(await linkService.deleteLink(id, linkId));
  },
};
