const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

const Employee = sequelize.define(
  'Employee', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
    },
    employeeName: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    punchIn: {
      type: DataTypes.TIME,
    },
    punchOut: {
      type: DataTypes.TIME,
    },
  },
  {
    tableName: 'EMPLOYEE', 
    createdAt: false,
    updatedAt: false, 
    deletedAt: false
  }
);

module.exports = Employee;
