const sequelize = require('../config/connection');
const  User  = require('../models/User');
const Powerups = require('../models/Powerups');
const userData = require('./userData.json');
const powerupsData = require('./powerupsData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    for (const powerup of powerupsData) {
        await Powerups.create({
        ...powerup,
        user_id: users.id,
    });
    }
    process.exit(0);
};

seedDatabase();














