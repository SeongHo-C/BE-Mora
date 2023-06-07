const { BadRequestClass } = require('../middlewares');

const serviceHandler = (service) => {
  return async (req, res) => {
    try {
      await service(req, res);
    } catch (err) {
      console.error(err);
      throw new BadRequestClass('BAD REQUREST ERROR');
    }
  };
};

module.exports = serviceHandler;
