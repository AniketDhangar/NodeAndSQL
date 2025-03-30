const express = require("express");
const {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
  doLogin,
} = require("../Controller/UserController.js");
const {
  addVariety,
  deleteVariety,
  getVariety,
  updateVariety,
} = require("../Controller/VarietyController.js");
const {
  addCrop,
  deleteCrop,
  getCrop,
} = require("../Controller/CropController.js");
const uploader = require("../Middleware/MulterUploads.js");
const authMiddleware = require("../Middleware/Auth.js");

const router = express.Router();

// User routes
router.post("/addusers", addUser);
router.get("/users", authMiddleware, getUsers);
router.put("/updateuser", authMiddleware, updateUser);
router.delete("/deleteduser", authMiddleware, deleteUser);

// Variety routes
router.post(
  "/addvariety",
  uploader.fields([
    { name: "varietyImage", maxCount: 1 },
    { name: "varietyMaleImgOne", maxCount: 1 },
    { name: "varietyMaleImgTwo", maxCount: 1 },
    { name: "varietyMaleImgThree", maxCount: 1 },
    { name: "varietyFemaleImgOne", maxCount: 1 },
    { name: "varietyFemaleImgTwo", maxCount: 1 },
    { name: "varietyFemaleImgThree", maxCount: 1 },
  ]),
  addVariety
);
router.get("/allvarieties", authMiddleware, getVariety);
router.put("/updatevariety", authMiddleware, updateVariety);
router.delete("/deletevariety", authMiddleware, deleteVariety);

// Crop routes
router.post("/addcrop", addCrop);
router.get("/crops", authMiddleware, getCrop);
router.delete("/removecrop", authMiddleware, deleteCrop);

router.post("/login", doLogin);

module.exports = router;
