const Users = require("../models/Users.js");
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
class UsersManager {
  async getUsers() {
    return await Users.find().lean();
  }
  async registerUser(userData) {
    userData._id = randomUUID();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const userCreated = await Users.create(userData);
    return userCreated.toObject();
  }

  async getUserByEmail(data) {
    const found = await Users.findOne(data).lean();
    if (!found) {
      throw new Error(`User not found`);
    } else {
      return found;
    }
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

  async resetUserPassword(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await Users.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    ).lean();
    if (!updated) {
      throw new Error("Can't reset password: user not found");
    } else {
      return updated;
    }
  }
}

module.exports = UsersManager;
