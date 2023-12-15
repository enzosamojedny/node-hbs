const Users = require("../../dao/models/Users");
const Router = require("express").Router;
const sessionRouter = Router();

sessionRouter.get("/api/session", (req, res) => {
  res.send("Welcome");
});

sessionRouter.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await Users.findOne({ email }).lean();
  if (!userFound) {
    return res.status(400).json({
      status: "error",
      message: "Login failed. User not found.",
    });
  }
  const userData = {
    email: userFound.email,
    name: userFound.name,
    last_name: userFound.last_name,
    gender: userFound.gender,
  };
  console.log(userData);
  if (password !== userFound.password) {
    return res.status(400).json({
      status: "error",
      message: "username and password are incorrect",
    });
  }
  req.session["user"] = userData;
  req.session["admin"] = true;
  res
    .status(201)
    .json({ status: "success", message: "You have successfully logged in" });
});

sessionRouter.get("/api/session/current", (req, res) => {
  if (req.session["user"]) {
    res.json(req.session["user"]);
  } else {
    res.status(400).json({
      status: "error",
      message: "No session saved, you need to login first!",
    });
  }
});
sessionRouter.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ status: "logout error", body: error });
    }
    res.send({
      status: "success",
      message: "you have successfully logged out",
    });
  });
});

sessionRouter.post("/session", () => {});
sessionRouter.post("/user", () => {});

module.exports = sessionRouter;
