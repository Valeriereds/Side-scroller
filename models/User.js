// require model and datatypes from sequelize and connect to configuration files 
const { Model, DataTypes } = require('sequelize');
// utilize bcrypt for password encryption 
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// name the User model using sequelize methods
class User extends Model {
    // double-check encrypted password to confirm logins
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// creates and describes the user model
User.init(
    {
        // the id field is a autoincremented primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // we will not set any restrictions on the player name string
        player_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // we are validating to require a password of at least 8 characters
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        },
        {
            // using hooks before password creation and update to salt the password 10 times through the bcyrpt encryption method
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
            // set sequelize standards to avoid timestamps, restrict pluralization of table names, pass in underscoring naming conventions, and pass the case-sensitive name of the user model
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
    // export the User model
    module.exports = User;

