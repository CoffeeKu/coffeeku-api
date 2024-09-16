'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Use the uuid library to generate a default UUID
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};