const express = require('express');
const educationRouter = express.Router();
const educationController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

/**
 * 교육 조회
 */
educationRouter.get(
  '/educations',
  loginRequired,
  serviceHandler(educationController.getEducation)
);

/**
 * 교육 등록
 */
educationRouter.post(
  '/educations/register',
  loginRequired,
  serviceHandler(educationController.addEducation)
);

/**
 * 교육 수정
 */
educationRouter.put(
  '/educations',
  loginRequired,
  serviceHandler(educationController.updateEducation)
);

/**
 * 교육 삭제
 */
educationRouter.delete(
  '/educations',
  loginRequired,
  serviceHandler(educationController.deleteEducation)
);

module.exports = educationRouter;
