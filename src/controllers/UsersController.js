const UsersManager = require("../daos/managers/UsersManager");
const usersManagerMongoDB = new UsersManager();

const GetUsers = async (req, res, next) => {
  try {
    const users = await usersManagerMongoDB.getUsers();
    if (users) {
      res.status(200).json({ users });
    }
  } catch (error) {
    next(error);
  }
};

const getUsername = async (req, res, next) => {
  try {
    const email = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "error", message: "No email received" });
    }

    const user = await usersManagerMongoDB.getUserByEmail(email);

    if (user) {
      res.status(200).json({ status: "success", message: user.email });
    } else {
      throw new Error(`User not found in the database`);
    }
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    let { id } = req.params;
    const getUserId = await usersManagerMongoDB.getUserById(id);

    if (getUserId) {
      res.status(200).json({ message: getUserId });
    } else {
      throw new Error(`User with ID ${id} not found in the database`);
    }
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await usersManagerMongoDB.deleteUser(id);
    res.status(200).json({ deleteUser });
  } catch (error) {
    next(error);
  }
};

const UpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToUpdate = req.body;
    if (!userToUpdate) {
      throw new Error("User not provided in the request body");
    }
    const updateUser = await usersManagerMongoDB.updateUser(id, userToUpdate);
    res.status(200).json({ updateUser });
  } catch (error) {
    next(error);
  }
};

const ResetPassword = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  GetUsers,
  getUserId,
  DeleteUser,
  UpdateUser,
  getUsername,
  ResetPassword,
};
