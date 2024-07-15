'use strict';
const {
  Model
} = require('sequelize');
const { hash, compare } = require("../helpers/bcrypt");
const { generateJWT } = require("../helpers/jwt");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "RoleId",
      })
    }

    validPassword(password) {
      return compare(password, this.password);
    }

    generateToken() {
      return generateJWT({
        id: this.id,
        email: this.email,
      });
    }

  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Use the uuid library to generate a default UUID
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    RoleId: DataTypes.UUID,
    is_active: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hash(user.password);
      },
    },
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};