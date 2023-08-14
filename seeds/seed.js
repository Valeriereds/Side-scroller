const sequelize = require('../config/connection');
const  User  = require('../models/User');
const Score = require('../models/Score')
const userData = require('./userData.json');
const scoresData = require('./scoresData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    for (const scores of scoresData) {
        await Score.create({
            ...scores
        })
    }
    process.exit(0);
};

seedDatabase();