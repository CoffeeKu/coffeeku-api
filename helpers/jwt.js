const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT: (user) => {
    return jwt.sign({
      id: user.id,
      email: user.email,
      role: user.Role.name,
    }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
  },
  verify: (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
  }
}