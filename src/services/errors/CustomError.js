class CustomError extends Error {
  constructor(message, errorCode, cause) {
    super(message);
    this.name = this.constructor.name;
    this.code = errorCode || CustomError.DEFAULT_CODE;
    if (cause) this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}

CustomError.DEFAULT_CODE = 500;

module.exports = {
  CustomError,
  EErrors: {
    ROUTING_ERROR: 400,
    DB_ERROR: 500,
    VALIDATION_ERROR: 422,
    AUTHENTICATION_ERROR: 401,
  },
};
