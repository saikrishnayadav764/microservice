const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Assignment = sequelize.define('Assignment', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false 
  }
}, {
  timestamps: false
});


Assignment.belongsTo(User, { foreignKey: 'creatorId', as: 'Creator' });

module.exports = Assignment;
