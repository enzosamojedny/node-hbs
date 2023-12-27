const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "myprivatekey";

//! CLASE JWT SIN PASSPORT

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
    jwt.verify(token, PRIVATE_KEY, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
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
    console.log("Not logged in:", req.headers.cookie);
    return res.redirect("/login");
  } else {
    //! SI AUTENTICA SI LOGUEO CON GOOGLE Y GITHUB
    console.log("Client logged in:", req.headers.cookie);
  }
  next();
}

module.exports = { onlyLoggedClient, onlyLoggedApi };
