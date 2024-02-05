const jwt = require("jsonwebtoken");
require("dotenv").config();

function encrypt(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_KEY,
      { expiresIn: "1w" },
      (error, encoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(encoded);
        }
      }
    );
  });
}

function decrypt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        const userId = decoded._id;
        resolve(userId);
      }
    });
  });
}

function onlyAdmins(req, res, next) {
  if (req.user && req.user.role === "admin") {
    console.log(req.user);
    if (req.user) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "You don't have administration privileges to access this data",
      });
    }
  }
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
  if (req.isAuthenticated()) {
    console.log("Client logged in:", req.headers.cookie);
  } else {
    console.log("Not logged in:", req.headers.cookie);
    return res.redirect("/login");
    //! SI AUTENTICA SI LOGUEO CON GOOGLE Y GITHUB
  }
  next();
}

module.exports = {
  onlyLoggedClient,
  onlyLoggedApi,
  encrypt,
  onlyAdmins,
  decrypt,
};
