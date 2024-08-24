const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    const { name, password } = req.body;
    try {
      if (!name || !password) throw { name: "ValidationError", message: "Name and password are required" };

      const user = await User.findOne({ where: { name }, raw: true });
      if (!user) throw { name: "NotFound", message: "User not found" };

      if (!comparePassword(password, user.password)) throw { name: "Unauthenticated", message: "Invalid password" };

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    const { name, password } = req.body;
    try {
      if (!name || !password) throw { name: "ValidationError", message: "Name and password are required" };

      const existingUser = await User.findOne({ where: { name }, raw: true });
      if (existingUser) throw { name: "ValidationError", message: "Name already registered" };

      const newUser = await User.create({ name, password });
      res.status(201).json({ message: "Registration successful", name: newUser.name });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
