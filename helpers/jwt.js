const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT: (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
  },
  verify: (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
  }
}