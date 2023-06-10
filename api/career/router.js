const express = require('express');
const careerRouter = express.Router();
const careerController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

/**
 * 경력 조회
 */
careerRouter.get(
  '/careers',
  loginRequired,
  serviceHandler(careerController.getCareer)
);

/**
 * 경력 등록
 */
careerRouter.post(
  '/careers/register',
  loginRequired,
  serviceHandler(careerController.addCareer)
);

/**
 * 경력 수정
 */
careerRouter.patch(
  '/careers/update',
  loginRequired,
  serviceHandler(careerController.updateCareer)
);

/**
 * 경력 삭제
 */
careerRouter.delete(
  '/careers/delete',
  loginRequired,
  serviceHandler(careerController.updateCareer)
);

module.exports = careerRouter;
