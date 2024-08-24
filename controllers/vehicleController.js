class vehicleController {
  static async getVehicles(req, res, next) {
    try {
      res.json({ message: "Hello world" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = vehicleController;
