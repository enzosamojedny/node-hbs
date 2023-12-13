const Router = require("express").Router;
const usersRouter = Router();
const {
  PostUser,
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
} = require("../../handlers/Users/UsersHandler");

usersRouter.post("/api/users", PostUser);
usersRouter.get("/api/users/:id", getUserId);
usersRouter.get("/api/users", GetUsers);
usersRouter.put("/api/users/:id", DeleteUser);
usersRouter.delete("/api/users/:id", UpdateUser);

module.exports = usersRouter;
