const express = require('express');
const { getBoards, getBoard } = require('./controller');

const router = express.Router();

router.get('/:category', getBoards);
router.get('/detail/:id', getBoard);

module.exports = router;
