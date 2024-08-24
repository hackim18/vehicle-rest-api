"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleModel extends Model {
    static associate(models) {
      VehicleModel.belongsTo(models.VehicleType, {
        foreignKey: "type_id",
        as: "type",
      });
      VehicleModel.hasMany(models.Pricelist, {
        foreignKey: "model_id",
        as: "pricelists",
      });
    }
  }
  VehicleModel.init(
    {
      name: DataTypes.STRING,
      type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "VehicleModel",
    }
  );
  return VehicleModel;
};
