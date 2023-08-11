// User's data will be stored here!

const { Model, DataTypes } = require('sequelize');
const sequelize = require('..config/connection');

class User extends Model {}

User.init(
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
        // Will become `high_score` in table due to `underscored` flag
        highScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        },
        {
            hooks: {
                beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
                beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
            },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
    
    module.exports = User;

