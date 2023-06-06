const {
  getBoards,
  getBoard,
  setBoard,
  deleteBoard,
  updateBoard,
} = require('./service');

exports.afterUploadImage = async (req, res, next) => {
  console.log(req.file);
  res.json({ path: req.file.path, origin_name: req.file.originalname });
};

exports.setBoard = async (req, res, next) => {
  const { category, title, content, hashtags, images } = req.body;
  const writer = req.currentId;

  try {
    await setBoard(writer, category, title, content, hashtags, images);
    res.status(201).json('게시판 등록');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteBoard = async (req, res, next) => {
  const { board_id } = req.body;
  const login_id = req.currentId;

  try {
    await deleteBoard(board_id, login_id);
    res.status(201).json('삭제 완료');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.updateBoard = async (req, res, next) => {
  const { category, title, content, hashtags, images, board_id } = req.body;
  const login_id = req.currentId;

  try {
    await updateBoard(
      category,
      title,
      content,
      hashtags,
      images,
      board_id,
      login_id
    );
    res.status(201).json('게시판 수정');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getBoards = async (req, res, next) => {
  const { cateogory } = req.params;

  try {
    const data = await getBoards(cateogory);
    return res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getBoard = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await getBoard(id);
    return res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
