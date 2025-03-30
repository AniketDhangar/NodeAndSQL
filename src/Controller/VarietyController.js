const Variety = require("../Models/VarietySchema");

const addVariety = async (req, res) => {
  try {
    const { varietyCode, varietyName, varietyGender, varietyDescription, cropId } = req.body;

    const newVariety = await Variety.create({
      varietyCode,
      varietyName,
      varietyGender,
      varietyDescription,
      cropId,
      varietyMaleImgOne: req.files?.varietyMaleImgOne?.[0]?.path.replace(/\\/g, "/") || null,
      varietyMaleImgTwo: req.files?.varietyMaleImgTwo?.[0]?.path.replace(/\\/g, "/") || null,
      varietyMaleImgThree: req.files?.varietyMaleImgThree?.[0]?.path.replace(/\\/g, "/") || null,
      varietyFemaleImgOne: req.files?.varietyFemaleImgOne?.[0]?.path.replace(/\\/g, "/") || null,
      varietyFemaleImgTwo: req.files?.varietyFemaleImgTwo?.[0]?.path.replace(/\\/g, "/") || null,
      varietyFemaleImgThree: req.files?.varietyFemaleImgThree?.[0]?.path.replace(/\\/g, "/") || null,
    });

    res.status(200).json({ message: "Variety added successfully.", data: newVariety });
  } catch (error) {
    console.error("Error adding variety:", error);
    res.status(500).json({ error: "Failed to add variety." });
  }
};

const getVariety = async (req, res) => {
  try {
    const allVariety = await Variety.findAll();
    res.status(200).json(allVariety);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateVariety = async (req, res) => {
  const { varietyDescription } = req.body;
  try {
    const updatedVariety = await Variety.update(
      {
        varietyDescription: req.body.newDescription,
      },
      {
        where: { id: req.body.vid },
      }
    );
    res.status(200).json(updatedVariety);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteVariety = async (req, res) => {
  try {
    const deletedCount = await Variety.destroy({
      where: { id: req.body.vid },
    });

    res.status(200).json({ message: "Variety deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addVariety, getVariety, updateVariety, deleteVariety };
