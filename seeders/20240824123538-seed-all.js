"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = (dataPath) =>
      require(`../seeders/data/${dataPath}.json`).map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      });

    await queryInterface.bulkInsert("Users", seedData("users"), {});
    await queryInterface.bulkInsert("VehicleBrands", seedData("vehicleBrands"), {});
    await queryInterface.bulkInsert("VehicleTypes", seedData("vehicleTypes"), {});
    await queryInterface.bulkInsert("VehicleModels", seedData("vehicleModels"), {});
    await queryInterface.bulkInsert("VehicleYears", seedData("vehicleYears"), {});
    await queryInterface.bulkInsert("Pricelists", seedData("pricelists"), {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
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
