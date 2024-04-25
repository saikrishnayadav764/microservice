// models/UserRole.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('UserRole', {
}, {
  timestamps: false
});

module.exports = UserRole;
