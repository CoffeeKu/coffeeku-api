const responseHelper = require('./response');

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
        errors: {},
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

  const response = responseHelper.error(error);
  res.status(response.code).json(response);
};