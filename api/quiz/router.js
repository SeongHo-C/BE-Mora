const express = require('express');
const quizRouter = express.Router();
const quizController = require('./controller');
const { serviceHandler } = require('../../utils');

quizRouter.get('/quiz', serviceHandler(quizController.getAllQuiz));

module.exports = quizRouter;
