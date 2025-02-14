import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('AgriSoft', 'root', 'Aniket@0768', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: (...msg) => console.log(msg), 
  // this above msg shows all details of schema
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;
