const errorHandler = require('./error-handler');
const {
  BadRequestClass,
  UnauthorizedClass,
  ForbiddenClass,
  NotFoundClass,
  InternalServerErrorClass,
} = require('./error-format');
const loginRequired = require('./login-required');
const adminRequired = require('./admin-required');

module.exports = {
  errorHandler,
  BadRequestClass,
  UnauthorizedClass,
  ForbiddenClass,
  NotFoundClass,
  InternalServerErrorClass,
  loginRequired,
  adminRequired,
};
