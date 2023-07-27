const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql',
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conectado exitosamente.');
  } catch (error) {
    console.error('Error al conectar,', error);
  }
}
testDatabaseConnection();

module.exports = sequelize;
