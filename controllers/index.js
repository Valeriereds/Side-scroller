// import express router
const router = require('express').Router();

// import sub-routers
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// mounts sub-routers to homepage and API routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// export main router
module.exports = router;