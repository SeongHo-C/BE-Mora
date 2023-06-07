const { BadRequestClass } = require('../middlewares');

const serviceHandler = (service) => {
  return async (req, res, next) => {
    try {
      await service(req, res);
      next();
    } catch (err) {
      console.error(err);
      throw new BadRequestClass('BAD REQUREST ERROR');
    }
  };
};

module.exports = serviceHandler;
