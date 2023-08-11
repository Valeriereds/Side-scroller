const router = require('express').Router();
const { User, Powerups } = require('../models');
const withAuth = require('../utils/auth');

router.get('/start', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Powerups }],
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
    res.redirect('/start');
    return;
  }

  res.render('login');
})

module.exports = router;