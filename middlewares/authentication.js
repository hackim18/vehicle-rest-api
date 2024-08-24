const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.authorization;

    if (!access_token) throw { name: "Unauthenticated", message: "Access token is required" };
    const [type, token] = access_token.split(" ");

    if (type !== "Bearer") throw { name: "Unauthenticated" };
    const payload = verifyToken(token);

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = { id: user.id, is_admin: user.is_admin };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
