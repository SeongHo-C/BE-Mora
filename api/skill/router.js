const express = require('express');
const skillRouter = express.Router();
const skillController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

skillRouter.get(
  '/skills',
  loginRequired,
  serviceHandler(skillController.getSkill)
);

skillRouter.get(
  '/skills/myskill',
  loginRequired,
  serviceHandler(skillController.getUserSkills)
);

skillRouter.post(
  '/skills/update',
  loginRequired,
  serviceHandler(skillController.updateUserSkills)
);

module.exports = skillRouter;
