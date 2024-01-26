const Router = require("express").Router;
const UsersManager = require("../../dao/managers/UsersManager");
const { onlyAdmins } = require("../../middlewares/authentication");
const usersManagerMongoDB = new UsersManager();
const usersRouter = Router();

const GetUsers = usersRouter.get("/api/users", onlyAdmins, async (req, res) => {
  try {
    const users = await usersManagerMongoDB.getUsers();
    if (users) {
      res.status(200).json({ users });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getUsername = usersRouter.get(
  "/api/users/myprofile",
  async (req, res) => {
    try {
      if (!req.session["user"]) {
        return res
          .status(400)
          .json({ status: "error", message: "You have to log in first" });
      }

      const data = {
        email: req.session["user"].email,
      };

      const getUserByEmail = await usersManagerMongoDB.getUserByEmail(data);

      if (getUserByEmail) {
        res.status(200).json({ status: "success", message: getUserByEmail });
      } else {
        throw new Error(`User not found in the database`);
      }
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);

const getUserId = usersRouter.get("/api/users/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const getUserId = await usersManagerMongoDB.getUserById(id);

    if (getUserId) {
      res.status(200).json({ message: getUserId });
    } else {
      throw new Error(`User with ID ${id} not found in the database`);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const DeleteUser = usersRouter.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await usersManagerMongoDB.deleteUser(id);
    res.status(200).json({ deleteUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const UpdateUser = usersRouter.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userToUpdate = req.body;
    if (!userToUpdate) {
      throw new Error("User not provided in the request body");
    }
    const updateUser = await usersManagerMongoDB.updateUser(id, userToUpdate);
    res.status(200).json({ updateUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const ResetPassword = usersRouter.post(
  "/api/resetpassword",
  async function registerUser(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (!password || !email) {
        throw new Error(
          "User password or email not provided in the request body"
        );
      }
      const updatePassword = await usersManagerMongoDB.resetUserPassword(
        email,
        password
      );
      res.status(200).json({ updatePassword });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);
module.exports = {
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
};
