const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Assignment = require('./Assignment');
const User = require('./User');

const AssignmentSubmission = sequelize.define('AssignmentSubmission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  assignmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Assignment,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  submissionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  submission: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: true // Assuming grade can be null until graded
  }
}, {
  timestamps: false
});

AssignmentSubmission.belongsTo(Assignment, { foreignKey: 'assignmentId' });
AssignmentSubmission.belongsTo(User, { foreignKey: 'studentId', as: 'Student' });

module.exports = AssignmentSubmission;
