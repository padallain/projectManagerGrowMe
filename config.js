// config.js
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
const PORT =  3000;

module.exports = {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  PORT
};
