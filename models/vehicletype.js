"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
