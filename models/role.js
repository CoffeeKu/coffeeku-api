'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "RoleId",
      })
    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Use the uuid library to generate a default UUID
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    paranoid: true,
  });
  return Role;
};