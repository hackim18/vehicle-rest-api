const { User } = require("../models");

async function authorization(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) throw { name: "NotFoundError", message: "User not found" };
    if (!user.is_admin) throw { name: "Forbidden", message: "You are not authorized" };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
