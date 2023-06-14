const { where } = require('sequelize');
const Link = require('./model');

module.exports = {
  async getLinks(id) {
    return await Link.findAll({
      where: { user_id: id },
      attributes: ['id', 'url', 'name'],
    });
  },

  async createLink(userId, url, name) {
    return await Link.create({ user_id: userId, url: url, name: name });
  },

  async updateLink(id, linkId, url, name) {
    console.log(url);
    return await Link.update(
      { url: url, name: name },
      { where: { id: linkId, user_id: id } }
    );
  },

  async deleteLink(userId, linkId) {
    return await Link.destroy({ where: { id: linkId, user_id: userId } });
  },
};
