const serviceHandler = (service) => {
  return async (req, res, next) => {
    try {
      await service(req, res);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = serviceHandler;
