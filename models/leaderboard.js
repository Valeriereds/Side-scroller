// User's data will be stored here!

const { Model, DataTypes } = require('sequelize');
const sequelize = require('..config/connection');

class Leaderboard extends Model {}

Leaderboard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Will become `player_name` in table due to `underscored` flag
        playerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        highscore: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'leaderboard',
    }
);
    
    module.exports = Leaderboard;

