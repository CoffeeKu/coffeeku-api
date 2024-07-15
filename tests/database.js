
const { sequelize } = require('../models');

const formatDataSeeder = (path) => {
  let data = require(path)
  return data.map(item => {
    return {
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })
}

module.exports = {
  getAdmin: () => {
    return require('../seeders/data/users.json').find(item => item.email === 'admin@yoypmail.com')
  },
  sync: async () => {
    await sequelize.sync({ force: true })
  },
  seed: async () => {
    let roles = formatDataSeeder('../seeders/data/roles.json')
  
    await sequelize.queryInterface.bulkInsert('Roles', roles, {});
  
    let users = formatDataSeeder('../seeders/data/users.json')
    
    await sequelize.queryInterface.bulkInsert('Users', users, {});
  }, 
  clean: async () => {
    await sequelize.queryInterface.bulkDelete("Roles", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  
    await sequelize.queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  }
}