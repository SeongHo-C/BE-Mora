const logger = require('../logger');

const serviceHandler = (service) => {
  return async (req, res, next) => {
    try {
      await service(req, res);
    } catch (err) {
      logger.error(err.message);
      next(err);
    }
  };
};

module.exports = serviceHandler;
