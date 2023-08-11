const router = require('express').Router();
const userRoutes = require('./userRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

router.use('/users', userRoutes);
router.use('/leaderboards', leaderboardRoutes);

module.exports = router;
