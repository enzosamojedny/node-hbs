const Router = require("express").Router;

const cookiesRouter = Router();

cookiesRouter.get("/", (req, res) => {
  res.send("Welcome");
});
cookiesRouter.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res
        .status(500)
        .json({ status: "Error logging out, please try again" });
    }
  });
});
