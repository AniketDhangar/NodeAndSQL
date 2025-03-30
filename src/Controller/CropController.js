const Crop = require("../Models/CropSchema");
const Variety = require("../Models/VarietySchema");

const addCrop = async (req, res) => {
  const { cropName, cropCode } = req.body;
  try {
    const addedCrop = await Crop.create(req.body);
    res
      .status(200)
      .json({ message: "Crop added successfully", data: addedCrop });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getCrop = async (req, res) => {
  try {
    const Crops = await Crop.findAll({
      include: {
        model: Variety,
        as: "Varieties",
        attributes: [
          "id",
          "varietyName",
          "varietyCode",
          "varietyGender",
          "varietyDescription",
          "varietyMaleImgOne",
          "varietyMaleImgTwo",
          "varietyMaleImgThree",
          "varietyFemaleImgOne",
          "varietyFemaleImgTwo",
          "varietyFemaleImgThree",
        ],
      },
    });
    res.status(200).json(Crops);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching crops", error: error.message });
  }
};

const deleteCrop = async (req, res) => {
  try {
    const removeCrop = await Crop.destroy({
      where: {
        id: req.body.cid,
      },
    });
    res.status(200).json(removeCrop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User deleted successfully" });
  }
};

module.exports = { addCrop, getCrop, deleteCrop };
