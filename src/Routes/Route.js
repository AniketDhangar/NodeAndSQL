import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../Controller/UserController.js";
import {
  addVariety,
  deleteVariety,
  getVariety,
  updateVariety,
} from "../Controller/VarietyController.js";
import { addCrop, deleteCrop, getCrop } from "../Controller/CropController.js";
import { uploader } from "../Middleware/MulterUploads.js";

const router = express.Router();

//user routes
router.post("/addusers", addUser);
router.get("/users", getUsers);
router.put("/updateuser", updateUser);
router.delete("/deleteduser", deleteUser);

//variety route
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
router.get("/allvarieties", getVariety);
router.put("/updatevariety", updateVariety);
router.delete("/deletevariety", deleteVariety);

//crop route
router.post("/addcrop", addCrop);
router.get("/crops", getCrop);
router.delete("/removecrop", deleteCrop);

export default router;
