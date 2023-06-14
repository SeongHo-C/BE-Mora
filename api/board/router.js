const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');
const boardController = require('./controller');
const logger = require('../../logger');

const router = express.Router();

if (!fs.existsSync('uploads')) {
  fs.mkdir('uploads', (err) => {
    if (err) logger.error('Error creating folder:', err);
    else logger.info('Folder created successfully.');
  });
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
router.post('/boards', loginRequired, serviceHandler(boardController.setBoard));
router.put(
  '/boards',
  loginRequired,
  serviceHandler(boardController.updateBoard)
);
router.delete(
  '/boards',
  loginRequired,
  serviceHandler(boardController.deleteBoard)
);
router.get('/boards/popular', serviceHandler(boardController.getPopularBoard));
router.get(
  '/boards/:category',
  loginRequired,
  serviceHandler(boardController.getBoards)
);
router.get(
  '/boards/detail/:id',
  loginRequired,
  serviceHandler(boardController.getBoard)
);
router.get(
  '/boards/detail/:id/comments',
  loginRequired,
  serviceHandler(boardController.getComments)
);

module.exports = router;
