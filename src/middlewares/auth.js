const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "myprivatekey";

function encrypt(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, PRIVATE_KEY, { expiresIn: "24h" }, (error, encoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(encoded);
      }
    });
  });
}

function decrypt(token) {
  return new Promise((resolve, reject) => {
    jwt.sign(token, PRIVATE_KEY, (error, encoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(encoded);
      }
    });
  });
}

function onlyLoggedApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(400).json({
      status: "error",
      message: "You need to log in to view the API!",
    });
  }
  next();
}
function onlyLoggedClient(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(400)
      .json({ status: "error", message: "You need to log in first!" });
  }
  next();
}

module.exports = { onlyLoggedClient, onlyLoggedApi };
