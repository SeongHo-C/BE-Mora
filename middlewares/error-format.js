class ResponseFormat extends Error {
  constructor(code, message, ...params) {
    super(...params);

    this.code = code;
    this.message = message;
  }
}

class BadRequestException extends ResponseFormat {
  constructor(message) {
    super(400, message);
  }
}

class UnauthorizedException extends ResponseFormat {
  constructor(message) {
    super(401, message);
  }
}

class ForbiddenException extends ResponseFormat {
  constructor(message) {
    super(403, message);
  }
}

class NotFoundException extends ResponseFormat {
  constructor(message) {
    super(404, message);
  }
}

class InternalServerErrorException extends ResponseFormat {
  constructor(message) {
    super(500, message);
  }
}

module.exports = {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
};
