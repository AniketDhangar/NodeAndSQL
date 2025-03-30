const express = require("express");
const router = require("./src/Routes/Route.js");
const sequelize = require("./src/Models/Database.js");
const authMiddleware = require("./src/Middleware/Auth.js");
require("./src/Models/References.js");
require('dotenv').config()

const app = express();


app.use(express.json());
app.use(router);

app.use("/Uploads", express.static("Uploads"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Sync Database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced successfully!");
  })
  .catch((error) => {
    console.error("❌ Error syncing database:", error);
  });
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
