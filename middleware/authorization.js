const errorHandler = require('./errorHandler')

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.role === 'admin') {
      next()
    } else {
      return errorHandler({
        name: 'FORBIDDEN',
        errors: 'You are not authorized to access this resource'
      }, req, res, next)
    }
  },
  isNormalUser: (req, res, next) => {
    if (req.user.role === 'user') {
      next()
    } else {
      return errorHandler({
        name: 'FORBIDDEN',
        errors: 'You are not authorized to access this resource'
      }, req, res, next)
    }
  }
}