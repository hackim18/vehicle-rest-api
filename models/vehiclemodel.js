"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
