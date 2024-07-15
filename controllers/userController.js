const { User } = require('../models/index');
const BaseController = require('./baseController');

class UserController extends BaseController {
  constructor() {
    super(User);
  }
}

module.exports = UserController;