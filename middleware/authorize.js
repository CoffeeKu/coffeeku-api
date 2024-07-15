const errorHandler = require('../helpers/errorHandler')
const verify = require('../helpers/jwt').verify

const getBearerToken = (headers) => {
  const bearerHeader = headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]

    return bearerToken
  } else {
    return null
  }
}

module.exports = {
  isLogin: (req, res, next) => {
    try {
      let token = getBearerToken(req.headers)

      if(!token) throw ({
        errors: {
          token: ['bearer token is required']
        }
      })

      const decoded = verify(token);

      req.user = decoded
      next()
    } catch (error) {
      errorHandler({
        name: 'NOT_AUTHORIZED',
        errors: error.errors || {
          token: error.message
        }
      }, req, res, next)
    }
  },
  isNotLogin: (req, res, next) => {
    let token = getBearerToken(req.headers)
    if (!token) {
      req.token = token
      next()
    } else {
      errorHandler({
        name: 'FORBIDDEN',
      }, req, res, next)
    }
  }
}