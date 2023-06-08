const { BadRequestClass } = require('../middlewares');
const logger = require('../logger');

const serviceHandler = (service) => {
  return async (req, res) => {
    try {
      await service(req, res);
    } catch (err) {
      logger.error(err.message);
      throw new BadRequestClass('BAD REQUREST ERROR');
    }
  };
};

module.exports = serviceHandler;
