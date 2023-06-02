const express = require('express');
const { getBoards } = require('./controller');

const router = express.Router();

router.get('/:category', getBoards);

module.exports = router;
