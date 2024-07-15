const responseSuccess = (data = {}, message = 'internal server error', code = 500, meta = {}) => {
  return {
    code,
    message,
    data,
    meta
  }
}

const responseError = (errors = {}, message = 'internal server error', code = 500) => {
  return {
    code,
    message,
    errors
  }
}

module.exports = {
  success: (data = {}, message = 'OK', code = 200, meta = {}) => {
    return responseSuccess(data, message, code, meta)
  },

  error: ({errors, message, code}) => {
    return responseError(errors, message, code)
  },
}