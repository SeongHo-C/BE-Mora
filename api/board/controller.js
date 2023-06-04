const { getBoards, getBoard, setBoard } = require('./service');

exports.afterUploadImage = async (req, res, next) => {
  console.log(req.file);
  res.json({ imageUrl: req.file.path });
};

exports.setBoard = async (req, res, next) => {
  const { cateogory, title, content, hashtags, imgUrls } = req.body;
  const writer = req.currentId;

  try {
    await setBoard(writer, cateogory, title, content, hashtags, imgUrls);
    res.status(201).json('게시판 등록');
  } catch (error) {
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
  } catch (error) {
    console.error(err);
    next(err);
  }
};
