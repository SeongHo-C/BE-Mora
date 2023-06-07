class ResponseFormat extends Error {
  constructor(code, message, ...params) {
    super(...params);

    this.code = code;
    this.message = message;
  }
}

class BadRequestClass extends ResponseFormat {
  constructor(message) {
    super(400, message);
  }
}

class UnauthorizedClass extends ResponseFormat {
  constructor(message) {
    super(401, message);
  }
}

class ForbiddenClass extends ResponseFormat {
  constructor(message) {
    super(403, message);
  }
}

class NotFoundClass extends ResponseFormat {
  constructor(message) {
    super(404, message);
  }
}

class InternalServerErrorClass extends ResponseFormat {
  constructor(message) {
    super(500, message);
  }
}

module.exports = {
  BadRequestClass,
  UnauthorizedClass,
  ForbiddenClass,
  NotFoundClass,
  InternalServerErrorClass,
};
