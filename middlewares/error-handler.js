const logger = require('../logger');

module.exports = (err, req, res, next) => {
  logger.error(err);
  res.status(err.code).json({ message: err.message, statusCode: err.code });
};
