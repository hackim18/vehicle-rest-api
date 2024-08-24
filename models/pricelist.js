"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pricelist extends Model {
    static associate(models) {
      Pricelist.belongsTo(models.VehicleModel, {
        foreignKey: "model_id",
        as: "model",
      });
      Pricelist.belongsTo(models.VehicleYear, {
        foreignKey: "year_id",
        as: "year",
      });
    }
  }
  Pricelist.init(
    {
      code: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      year_id: DataTypes.INTEGER,
      model_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pricelist",
    }
  );
  return Pricelist;
};
