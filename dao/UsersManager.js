const Users = require("./models/Users.js");
const { randomUUID } = require("crypto");

class UsersManager {
  async getUsers() {
    return await Users.find().lean();
  }
  async addUser(user) {
    user._id = randomUUID();
    const userCreated = await Users.create(user);
    return userCreated.toObject();
  }

  async getUserById(userId) {
    const found = await Users.findById({ userId }).lean();
    if (!found) {
      throw new Error(`User with id ${userId} not found`);
    } else {
      return found;
    }
  }
  async deleteUser(userId) {
    const userToDelete = await Users.findByIdAndDelete({
      userId,
    }).lean();
    if (!userToDelete) {
      throw new Error(`User with id ${userId} couldnt be deleted`);
    } else {
      return userToDelete;
    }
  }
  async updateUser(userId, updatedUser) {
    const userToUpdate = await Users.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    }).lean();
    if (!userToUpdate) {
      throw new Error(`User with id ${userId} couldnt be updated`);
    } else {
      return userToUpdate;
    }
  }
}
module.exports = UsersManager;
