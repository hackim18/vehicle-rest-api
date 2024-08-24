"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    static associate(models) {
      VehicleType.belongsTo(models.VehicleBrand, {
        foreignKey: "brand_id",
        as: "brand",
      });
      VehicleType.hasMany(models.VehicleModel, {
        foreignKey: "type_id",
        as: "models",
      });
    }
  }
  VehicleType.init(
    {
      name: DataTypes.STRING,
      brand_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "VehicleType",
    }
  );
  return VehicleType;
};
