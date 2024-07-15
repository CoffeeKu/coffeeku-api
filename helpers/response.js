const responseSuccess = (data = {}, message = 'internal server error', code = 500) => {
  return {
    code,
    message,
    data
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
  success: (data = {}, message = 'OK', code = 200) => {
    return responseSuccess(data, message, code)
  },

  error: ({errors, message, code}) => {
    return responseError(errors, message, code)
  },
}