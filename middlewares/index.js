const errorHandler = require('./error-handler');
const {
  BadRequestClass,
  UnauthorizedClass,
  ForbiddenClass,
  NotFoundClass,
  InternalServerErrorClass,
} = require('./error-format');
const loginRequired = require('./login-required');

module.exports = {
  errorHandler,
  BadRequestClass,
  UnauthorizedClass,
  ForbiddenClass,
  NotFoundClass,
  InternalServerErrorClass,
  loginRequired,
};
