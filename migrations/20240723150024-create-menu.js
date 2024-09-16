'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      CategoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      decription: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};