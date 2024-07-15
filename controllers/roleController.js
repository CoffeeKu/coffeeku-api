const { Role, User } = require('../models/index');
const BaseController = require('./baseController');

class RoleController extends BaseController {
  constructor() {
    super(Role);
  }

  get filterable() {
    return ['name']
  }

  get attributes() {
    return ['id', 'name', 'updatedAt']
  }

  get sortable() {
    return ['name', 'createdAt', 'updatedAt']
  }

  get includable() {
    return [User]
  }
} 

module.exports = RoleController;