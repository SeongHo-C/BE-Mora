const express = require('express');
const userRouter = express.Router();
const { addUser, getUserToken } = require('./controller');
// const { asyncHandler, loginRequired } = require('../../middlewares');

userRouter.post('/register', addUser);
userRouter.post('/login', getUserToken);

module.exports = userRouter;
