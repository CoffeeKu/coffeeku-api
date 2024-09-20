const responseHelper = require('../helpers/response');
const winston = require('winston');
const path = require('path');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../storage/logs/error.log') })
  ],
});

module.exports = (err, req, res, next) => {
  let error = {
    code: 500,
    message: "Internal server error",
    errors: {},
  };

  switch (err.name) {
    case "NOT_FOUND":
      error = {
        code: 404,
        message: "NOT_FOUND",
        errors: err.errors || {},
      };
      break;
    case "BAD_REQUEST":
      error = {
        code: 400,
        message: "BAD_REQUEST",
        errors: err.errors || {},
      };
      break;
    case "NOT_AUTHORIZED":
      error = {
        code: 401,
        message: "NOT_AUTHORIZED",
        errors: err.errors || {},
      };
      break;
    case "FORBIDDEN":
      error = {
        code: 403,
        message: "FORBIDDEN",
        errors: err.errors || {},
      };
      break;
    default:
  }

  // Log the error using Winston
  logger.error({
    message: error.message,
    code: error.code,
    errors: error.errors,
    stack: err.stack,
  });

  const response = responseHelper.error(error);

  res.status(response.code).json(response);
};