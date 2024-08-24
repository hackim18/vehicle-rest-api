const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        throw { name: "ValidationError", message: "Name and password are required" };
      }
      const user = await User.findOne({ where: { name }, raw: true });
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      const passwordMatch = comparePassword(password, user.password);
      if (!passwordMatch) {
        throw { name: "Unauthenticated", message: "Invalid password" };
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        throw { name: "ValidationError", message: "Name and password are required" };
      }
      const user = await User.findOne({ where: { name }, raw: true });
      if (user) {
        throw { name: "ValidationError", message: "Name already registered" };
      }
      const newUser = await User.create({ name, password });
      res.status(201).json({ id: newUser.id, name: newUser.name });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
