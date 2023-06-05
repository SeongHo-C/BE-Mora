const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { loginRequired } = require('../../middlewares');

const {
  getBoards,
  getBoard,
  setBoard,
  deleteBoard,
  updateBoard,
  afterUploadImage,
} = require('./controller');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', loginRequired, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', loginRequired, upload2.none(), setBoard);
router.delete('/', loginRequired, upload2.none(), deleteBoard);
router.put('/', loginRequired, upload2.none(), updateBoard);

router.get('/:category', getBoards);
router.get('/detail/:id', getBoard);

module.exports = router;
