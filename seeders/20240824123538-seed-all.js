"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = (dataPath) =>
      require(`../seeders/data/${dataPath}.json`).map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      });

    const users = seedData("users").map((user) => {
      user.password = hashPassword(user.password);
      return user;
    });

    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("VehicleBrands", seedData("vehicleBrands"), {});
    await queryInterface.bulkInsert("VehicleTypes", seedData("vehicleTypes"), {});
    await queryInterface.bulkInsert("VehicleModels", seedData("vehicleModels"), {});
    await queryInterface.bulkInsert("VehicleYears", seedData("vehicleYears"), {});
    await queryInterface.bulkInsert("Pricelists", seedData("pricelists"), {});
  },

  async down(queryInterface, Sequelize) {
    const deleteOptions = {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    };
    await queryInterface.bulkDelete("Users", null, deleteOptions);
    await queryInterface.bulkDelete("VehicleBrands", null, deleteOptions);
    await queryInterface.bulkDelete("VehicleTypes", null, deleteOptions);
    await queryInterface.bulkDelete("VehicleModels", null, deleteOptions);
    await queryInterface.bulkDelete("VehicleYears", null, deleteOptions);
    await queryInterface.bulkDelete("Pricelists", null, deleteOptions);
  },
};
