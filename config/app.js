require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  TIMEZONE: process.env.TIMEZONE || "Asia/Jakarta",
  DB_HOST: process.env.DB_HOST || "localhost:3000",
}