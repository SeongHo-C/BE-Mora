const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');
const boardController = require('./controller');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없으므로 uploads 폴더를 생성합니다.');
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

router.post(
  '/boards/img',
  loginRequired,
  upload.single('img'),
  serviceHandler(boardController.afterUploadImage)
);

const upload2 = multer();
router.post('/boards', loginRequired, upload2.none(), boardController.setBoard);

router.put(
  '/boards',
  loginRequired,
  upload2.none(),
  serviceHandler(boardController.updateBoard)
);

router.delete(
  '/boards',
  loginRequired,
  serviceHandler(boardController.deleteBoard)
);

// router.get('/:category', getBoards);
// router.get('/detail/:id', getBoard);

module.exports = router;
