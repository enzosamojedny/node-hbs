const Router = require("express").Router;
const UsersManager = require("../../dao/UsersManager");
const usersManagerMongoDB = new UsersManager();
const usersRouter = Router();

function onlyLogged(req, res, next) {
  if (req.session["user"]) {
    return res
      .status(200)
      .json({ status: "success", message: "You have successfully logged in" });
  }
  next();
}
const PostUser = usersRouter.post("/api/users", async (req, res) => {
  try {
    const userDetails = req.body;
    if (!userDetails) {
      throw new Error("user details not provided in the request body");
    }
    const addedUser = await usersManagerMongoDB.addUser(userDetails);
    res.status(200).json({ message: addedUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const GetUsers = usersRouter.get("/api/users", async (req, res) => {
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
module.exports = {
  PostUser,
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
};
