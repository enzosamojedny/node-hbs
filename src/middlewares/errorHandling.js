const { CustomError } = require("../services/errors/customError");

function errorHandlingMiddleware(err, req, res, next) {
  if (err instanceof CustomError) {
    res.status(400).json({
      error: {
        name: err.name,
        message: err.message,
        code: err.code,
        ...(err.cause && { cause: err.cause }),
      },
    });
  } else {
    res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
  next();
}

module.exports = errorHandlingMiddleware;
