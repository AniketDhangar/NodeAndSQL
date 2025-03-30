const Crop = require("./CropSchema.js");
const Variety = require("./VarietySchema.js");

Crop.hasMany(Variety, { foreignKey: "cropId", as: "Varieties" });
Variety.belongsTo(Crop, { foreignKey: "cropId", as: "Crop" });

module.exports = { Crop, Variety };
