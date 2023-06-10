const boardService = require('./service');
const logger = require('../../logger');

module.exports = {
  async afterUploadImage(req, res) {
    logger.info(`${req.file.originalname} 업로드 성공`);
    res.status(201).json({
      file_name: req.file.filename,
      origin_name: req.file.originalname,
    });
  },

  async setBoard(req, res) {
    const { category, title, content, hashtags, images } = req.body;
    const writer = req.currentId;

    res
      .status(201)
      .json(
        await boardService.setBoard(
          writer,
          category,
          title,
          content,
          hashtags,
          images
        )
      );
  },

  async deleteBoard(req, res) {
    const { board_id } = req.body;
    const loginId = req.currentId;

    await boardService.deleteBoard(board_id, loginId);
    res.status(200).json('게시글 삭제 완료');
  },

  async updateBoard(req, res) {
    const { category, title, content, hashtags, images, board_id } = req.body;
    const loginId = req.currentId;

    await boardService.updateBoard(
      category,
      title,
      content,
      hashtags,
      images,
      board_id,
      loginId
    );
    res.status(200).json('게시글 수정 완료');
  },

  async getBoards(req, res) {
    const { category } = req.params;

    res.status(200).json(await boardService.getBoards(category));
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
