const bcrypt = require("bcrypt");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

module.exports = { hashPassword, comparePassword };
