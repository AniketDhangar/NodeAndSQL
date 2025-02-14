import sequelize from "../Models/Database.js";
import User from "../Models/UserSchema.js";

//add user
const addUser = async (req, res) => {
  const { userName, userMobile, userPassword } = req.body;
  try {
    const isExistedUser = await User.findOne({ userMobile });
    if (isExistedUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Secure password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const addedUser = await User.create({
      userName,
      userMobile,
      userPassword: hashedPassword,
    });
    res.status(200).json(addedUser);
    console.log("✅", addedUser);
  } catch (error) {
    console.log("error to add user", error);
    res.status(500).json(error);
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
    console.log("delete ho gaya bhai");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { userPassword, userMobile } = req.body;
  try {
    const updatedUser = await User.update(
      {
        userPassword: req.body.updatedPass,
        userMobile: req.body.updatedMob,
      },
      {
        where: { id: req.body.uid },
      }
    );
    res.status(200).json(updatedUser);
    console.log("updated hai");
  } catch (error) {
    console.log("error hai", error);
    res.status(500).json(error);
  }
};

export { addUser, getUsers, updateUser, deleteUser };
