// // require model and datatypes from sequelize and connect to configuration files 
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// // name the Score model using sequelize methods
// class Score extends Model {}

// // create and describe the scores model
// Score.init(
//   {
//     // the id field is a autoincremented primary key
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     // the user's score will be logged in this column as an integer
//     score: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     // the user_id column references the id column of the user table, connecting both tables
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: 'user',
//         key: 'id'
//       },
//     },
//   },
//   {
//     // set sequelize standards to avoid timestamps, restrict pluralization of table names, pass in underscoring naming conventions, and pass the case-sensitive name of the scores model
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'scores',
//   }
// );

// // export the Score model
// module.exports = Score;