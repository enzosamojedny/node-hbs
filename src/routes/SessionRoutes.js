const Users = require("../../dao/models/Users");
const Router = require("express").Router;
const sessionRouter = Router();

sessionRouter.get("/api/session", (req, res) => {
  res.send("Welcome");
});

const user = sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userFound = await Users.findOne({ email }).lean();
  if (!userFound) {
    res.status(400).send("Login failed.");
  }
  const userData = {
    email: user.email,
    name: user.name,
    last_name: user.last_name,
  };

  if (password !== userFound.password) {
    return res.status(400).send("username and password are incorrect");
  }
  req.session["user"] = userData;
  req.session["admin"] = true;
  res
    .status(201)
    .json({ status: "success", message: "You have successfully logged in" });
});

sessionRouter.post("/logout", (req, res) => {
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
