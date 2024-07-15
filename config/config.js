require('dotenv').config()

const sequelizeConfig = {
  [process.env.NODE_ENV]: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "development-db",
    dialect: process.env.DB_DRIVER || "postgres",
    logging: process.env.DB_LOGGING || false,
  },
  test: {
    host: process.env.DB_TEST_HOST || "localhost",
    port: process.env.DB_TEST_PORT || "5432",
    username: process.env.DB_TEST_USERNAME || "postgres",
    password: process.env.DB_TEST_PASSWORD || "postgres",
    database: process.env.DB_TEST_NAME || "test-db",
    dialect: process.env.DB_TEST_DRIVER || "postgres",
    logging: process.env.DB_TEST_LOGGING || false,
  }
}

module.exports = sequelizeConfig
