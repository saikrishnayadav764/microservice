const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.db', // Path to SQLite database file
  logging: false, // Disabling logging
});

module.exports = sequelize;
