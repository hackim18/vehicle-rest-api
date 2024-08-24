"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleBrand extends Model {
    static associate(models) {
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
