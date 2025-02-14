import Crop from "./CropSchema.js";
import Variety from "./VarietySchema.js";

Crop.hasMany(Variety, { foreignKey: "cropId", as: "Varieties" });
Variety.belongsTo(Crop, { foreignKey: "cropId", as: "Crop" });

export { Crop, Variety };
