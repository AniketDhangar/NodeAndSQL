import Variety from "../Models/VarietySchema.js";

//add variety

// const addVariety = async (req, res) => {
//   // Extract the necessary data from the request body
//   const { varietyCode, varietyName, varietyGender, varietyDescription } =
//     req.body;

//    // Extract file paths from req.files (if they exist)
//    const varietyMaleImgOne = req.files["varietyMaleImgOne"] ? req.files["varietyMaleImgOne"][0].path.replace(/\\/g, "/") : null;
//    const varietyMaleImgTwo = req.files["varietyMaleImgTwo"] ? req.files["varietyMaleImgTwo"][0].path.replace(/\\/g, "/") : null;
//    const varietyMaleImgThree = req.files["varietyMaleImgThree"] ? req.files["varietyMaleImgThree"][0].path.replace(/\\/g, "/") : null;
//    const varietyFemaleImgOne = req.files["varietyFemaleImgOne"] ? req.files["varietyFemaleImgOne"][0].path.replace(/\\/g, "/") : null;
//    const varietyFemaleImgTwo = req.files["varietyFemaleImgTwo"] ? req.files["varietyFemaleImgTwo"][0].path.replace(/\\/g, "/") : null;
//    const varietyFemaleImgThree = req.files["varietyFemaleImgThree"] ? req.files["varietyFemaleImgThree"][0].path.replace(/\\/g, "/") : null;
 

//   // If there are any files uploaded, use the first one as the varietyImage; otherwise, set it to null
//   // const varietyImage = filepaths.length > 0 ? filepaths[0] : null;

//   try {
//     // Create a new entry in the Variety table using the provided data
//     const addedVar = await Variety.create({
//       varietyCode,
//       varietyName,
//       varietyGender,
//       varietyDescription,
//       varietyMaleImgOne,
//       varietyMaleImgTwo,
//       varietyMaleImgThree,
//       varietyFemaleImgOne,
//       varietyFemaleImgtwo,
//       varietyFemaleImgThree,
//     });

//     res.status(200).json(addedVar);
//     console.log("Variety added successfully.");
//   } catch (error) {
//     console.error("Error adding variety: ", error);
//     res.status(500).json({ error: "Failed to add variety." });
//   }
// };
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


export default addVariety;


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

export { addVariety, getVariety, updateVariety, deleteVariety };
