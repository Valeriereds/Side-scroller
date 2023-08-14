// import express router
const router = require('express').Router();

// import user and leaderboard route modules
const userRoutes = require('./userRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

// mount routes at /users and /leaderboards paths
router.use('/users', userRoutes);
router.use('/leaderboards', leaderboardRoutes);

// export router
module.exports = router;