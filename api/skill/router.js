const express = require('express');
const skillRouter = express.Router();
const skillController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

skillRouter.get(
  '/skill',
  loginRequired,
  serviceHandler(skillController.getSkill)
);

skillRouter.get(
  '/skill/myskill',
  loginRequired,
  serviceHandler(skillController.getUserSkills)
);

skillRouter.post(
  '/skill/update',
  loginRequired,
  serviceHandler(skillController.updateUserSkills)
);

module.exports = skillRouter;
