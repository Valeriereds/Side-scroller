// require the model and datatypes from sequelize and connect to the configuration files 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// names the scores model using sequelize methods
class Scores extends Model {}

// creates and describes the scores model
Scores.init(
  {
    // the id field is a autoincremented primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // the user's score will be logged in this column as an integer
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // the user_id column references the id column of the user table, connecting both tables
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
    },
  },
  {
    // setting sequelize standards to avoid timestamps, to keep it from adding an 's' to the table names, to understand the underscoring naming conventions, and to pass the case-sensitive name of the scores model
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'scores',
  }
);

// exporting the scores model
module.exports = Scores;
