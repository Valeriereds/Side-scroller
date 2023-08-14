// import express router, models, and authentication middleware
const router = require('express').Router();
const { User, Score } = require('../models');
const withAuth = require('../utils/auth');

// GET method to render login page at base url
router.get('/', async (req, res) => {
  try {
    res.render('login', {
      logged_in: req.session.logged_in
    });
  // catches any errors and sends error response
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET method to render gameover page if logged in
router.get('/gameover', withAuth, async (req, res) => {
  try {
    // finds score created when game ends to display
    const scoreData = await Score.findAll();
    const scores = scoreData.map((score) => score.get({plain: true}));
    let lastScore = scores[scores.length-1].score;
    res.render('gameover', {
      lastScore,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET method to render homepage if logged in
router.get('/homepage', withAuth, async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET method to render leaderboard page if logged in
router.get('/leaderboards', withAuth, async (req, res) => {
  try {
    // Get all scores and JOIN with user data
    const scoreData = await Score.findAll({
    include: [
      {
        model: User,
        attributes: ['player_name'],
      }],
    // filters for 5 highest scores to display on leaderboard
    order: [['score', 'DESC']],
    limit: 5,
    });
    // Serialize data so the template can read it
    const scores = scoreData.map((score) => score.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('leaderboards', { 
        scores, 
        logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET method to render start game page if logged in
router.get('/start', withAuth, async (req, res) => {
  try {
    // finds session user id
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const user = userData.get({ plain: true });
    res.render('start', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET method to render homepage if logged in and redirects to login page if not
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
})

// export routes as module
module.exports = router;