const sequelize = require('../config/connection');
const  User  = require('../models/User');
const Scores = require('../models/Scores')
const userData = require('./userData.json');
const scoresData = require('./scoresData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    for (const scores of scoresData) {
        await Scores.create({
            ...scores
        })
    }
    process.exit(0);
};

seedDatabase();