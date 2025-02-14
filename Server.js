import express from 'express'
import router from './src/Routes/Route.js'
import sequelize from './src/Models/Database.js'
import './src/Models/References.js'

const app = express()
const PORT = 5000   

app.use(express.json())
app.use(router)

// multer image 
app.use('/Uploads', express.static('Uploads'));


// Sync Database
sequelize
  .sync({ force: true }) // Ensures tables exist without dropping data
  .then(() => {
    console.log("✅ Database synced successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error syncing database:", error);
  });

// Remove the redundant app.listen call
// app.listen(PORT,()=>{
//     console.log("server is running on port 3000")
// })   