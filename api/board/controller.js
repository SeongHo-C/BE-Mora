const boardService = require('./service');
const logger = require('../../logger');

module.exports = {
  async afterUploadImage(req, res) {
    logger.info(`${req.file.originalname} 업로드 성공`);
    res.status(201).json({
      img_path: `http://www.moyeora-racer.com:5000/${req.file.filename}`,
    });
  },

  async setBoard(req, res) {
    const { category, title, content, hashtags, images } = req.body;
    const writer = req.currentId;

    res
      .status(201)
      .json(
        await boardService.setBoard(
          category,
          title,
          content,
          hashtags,
          images,
          writer
        )
      );
  },

  async deleteBoard(req, res) {
    const { board_id } = req.body;
    const loginId = req.currentId;

    res.status(200).json(await boardService.deleteBoard(board_id, loginId));
  },

  async updateBoard(req, res) {
    const { category, title, content, hashtags, images, board_id } = req.body;
    const loginId = req.currentId;

    res
      .status(200)
      .json(
        await boardService.updateBoard(
          category,
          title,
          content,
          hashtags,
          images,
          board_id,
          loginId
        )
      );
  },

  async getBoards(req, res) {
    const { category } = req.params;
    const { keyword = '' } = req.query;

    res.status(200).json(await boardService.getBoards(category, keyword));
  },

  async getBoard(req, res) {
    const { id } = req.params;

    res.status(200).json(await boardService.getBoard(id));
  },

  async getComments(req, res) {
    const { id } = req.params;

    res.status(200).json(await boardService.getComments(id));
  },

  async getPopularBoard(req, res) {
    res.status(200).json(await boardService.getPopularBoard());
  },
};
