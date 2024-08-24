'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VehicleYear.init({
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VehicleYear',
  });
  return VehicleYear;
};