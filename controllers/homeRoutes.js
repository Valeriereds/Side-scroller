const router = require('express').Router();
const { User, Scores } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('login', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/gameover', withAuth, async (req, res) => {
  try {
    // trying to display last score on gameover
    // const scoreData = await Scores.findAll();
    // const scores = scoreData.map((score) => score.get({plain: true}));
    res.render('gameover', {
      // scores,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// router.get('/leaderboards', async (req, res) => {
//   try {
//     res.render('leaderboards', {
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

router.get('/leaderboards', withAuth, async (req, res) => {
  try {
      // Get all scores and JOIN with user data
      const scoreData = await Scores.findAll({
      include: [
          {
              model: User,
              attributes: ['player_name'],
          }],
      order: [['score', 'DESC']],
      limit: 5,
      });

      // res.render('leaderboards', {
      //   logged_in: req.session.logged_in
      // })
      console.log(scoreData);
      // Serialize data so the template can read it
      const scores = scoreData.map((score) => score.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('leaderboards', { 
          scores, 
          logged_in: req.session.logged_in 
      });
      // res.status(200).json(scoreData);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

router.get('/start', withAuth, async (req, res) => {
  try {
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
})

module.exports = router;