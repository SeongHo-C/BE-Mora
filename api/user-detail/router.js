const express = require('express');
const userDetailRouter = express.Router();
const multer = require('multer');
const path = require('path');
const userDetalController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

userDetailRouter.get(
  '/users/mypage',
  loginRequired,
  serviceHandler(userDetalController.getProfile)
);

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
userDetailRouter.post(
  '/users/mypage/img/upload',
  upload.single('img'),
  serviceHandler(userDetalController.uploadImage)
);

userDetailRouter.put(
  '/users/open-profile',
  loginRequired,
  serviceHandler(userDetalController.setOpenProfile)
);

userDetailRouter.put(
  '/users/mypage/edit',
  loginRequired,
  serviceHandler(userDetalController.setProfile)
);

userDetailRouter.get(
  '/users/mypage/board',
  loginRequired,
  serviceHandler(userDetalController.getMyBoard)
);

userDetailRouter.get(
  '/users/open-profile',
  serviceHandler(userDetalController.getOpenProfile)
);
userDetailRouter.get(
  '/users/open-profile/search',
  serviceHandler(userDetalController.getOpenProfileByKeyword)
);

module.exports = userDetailRouter;
