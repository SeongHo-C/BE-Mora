const boardService = require('./service');

module.exports = {
  async afterUploadImage(req, res) {
    console.log(req.file);
    res
      .status(201)
      .json({ path: req.file.path, origin_name: req.file.originalname });
  },

  async setBoard(req, res) {
    const { category, title, content, hashtags, images } = req.body;
    const writer = req.currentId;

    await boardService.setBoard(
      writer,
      category,
      title,
      content,
      hashtags,
      images
    );
    res.status(201).json('게시글 등록 성공');
  },

  async deleteBoard(req, res) {
    const { board_id } = req.body;
    const login_id = req.currentId;

    await boardService.deleteBoard(board_id, login_id);
    res.status(200).json('게시글 삭제 완료');
  },

  async updateBoard(req, res) {
    const { category, title, content, hashtags, images, board_id } = req.body;
    const login_id = req.currentId;

    await boardService.updateBoard(
      category,
      title,
      content,
      hashtags,
      images,
      board_id,
      login_id
    );
    res.status(200).json('게시글 수정 완료');
  },

  async getBoards(req, res) {
    const { category } = req.params;

    res.status(200).json(await boardService.getBoards(category));
  },
};
