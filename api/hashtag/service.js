const { Hashtag } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  async getHashtags(keyword) {
    const hashtags = await Hashtag.findAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
      },
      order: [['usage_cnt', 'DESC']],
      limit: 5,
    });

    return hashtags.map((hashtag) => hashtag.title);
  },
};
