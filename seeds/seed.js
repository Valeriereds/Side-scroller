const sequelize = require('../config/connection');
const  User  = require('../models/User');
const Powerups = require('../models/Powerups');
const Scores = require('../models/Scores')
const userData = require('./userData.json');
const powerupsData = require('./powerupsData.json');
const scoresData = require('./scoresData.json')


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    for (const powerup of powerupsData) {
        await Powerups.create({
        ...powerup
    });
    }
    for (const scores of scoresData) {
        await Scores.create({
            ...scores
        })
    }
    process.exit(0);
};

seedDatabase();


// routes -group
// 













