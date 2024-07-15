const bcrypt = require('bcryptjs');

module.exports = {
  hash: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  compare: (password, hash) => bcrypt.compareSync(password, hash)
}