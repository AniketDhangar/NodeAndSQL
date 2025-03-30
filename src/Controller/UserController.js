const sequelize = require("../Models/Database");
const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addUser = async (req, res) => {
  try {
    const { userPassword, userMobile } = req.body;
    const salt = 10;

    if (!userMobile || !userPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ where: { userMobile } });
    if (existingUser) {
      return res.status(409).json({ message: "User is already registered." });
    }

    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const addedUser = await User.create({
      ...req.body,
      userPassword: hashedPassword,
    });

    console.log("✅ User added:", addedUser);
    res
      .status(201)
      .json({ message: "User registered successfully.", user: addedUser });
  } catch (error) {
    console.error("❌ Error adding user:", error);
    res.status(500).json({ message: "error in adding", error });
  }
};

const doLogin = async (req, res) => {
  try {
    const { userMobile, userPassword,isBlock } = req.body;

    if (!userMobile || !userPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all details." });
    }

 

    const loggedUser = await User.findOne({ where: { userMobile } });
    if (!loggedUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    if (!loggedUser.userPassword) {
      return res
        .status(500)
        .json({ success: false, message: "User password is missing." });
    }
    if (loggedUser.isBlock) {
      return res
        .status(403)
        .json({ success: false, message: "User is blocked." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      userPassword,
      loggedUser.userPassword
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password." });
    }

    //   JWT token
    const payload = { id: loggedUser.id, userMobile: loggedUser.userMobile };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    console.log(token);
    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        loggedUser,
        token,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.body.uid,
      },
    });
    res.status(200).json({ message: "User deleted successfully" });
    console.log("deleted ");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { uid, updatedPass, updatedMob,isBlock } = req.body;

    let userPassword;
    if (updatedPass) {
      const salt = 10;
      userPassword = await bcrypt.hash(updatedPass, salt);
    }

    const updatedUser = await User.update(
      {
        userPassword: userPassword,
        userMobile: updatedMob,
        isBlock: isBlock,
      },
      { where: { id: uid } }
    );

    if (updatedUser[0] === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    const user = await User.findOne({ where: { id: uid } });

    res.status(200).json({ message: "User updated successfully", user });
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

module.exports = updateUser;

module.exports = { addUser, getUsers, updateUser, deleteUser, doLogin };
