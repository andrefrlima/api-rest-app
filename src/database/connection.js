require('dotenv').config();
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // opcional:
    port: Number(process.env.DB_PORT || 3306),
    charset: 'utf8mb4'
  },
  pool: { min: 0, max: 7 },
});

module.exports = db;
