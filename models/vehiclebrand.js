"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VehicleBrand.hasMany(models.VehicleType, {
        foreignKey: "brand_id",
        as: "types",
      });
    }
  }
  VehicleBrand.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VehicleBrand",
    }
  );
  return VehicleBrand;
};
