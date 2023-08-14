// import express router and User model
const router = require('express').Router();
const User = require('../../models/User');

// GET method to read all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  // catches any errors and sends error response
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST method to create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    // save user id and logged in status to session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// POST method route for existing users to log in
router.post('/login', async (req, res) => {
  try {
    // find user by player name
    const userData = await User.findOne({ where: { player_name: req.body.player_name } });
    // if no user, send error message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    // verify hashed password matches
    const validPassword = await userData.checkPassword(req.body.password);
    // if password is invalid, send error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST method route to log out
router.post('/logout', (req, res) => {
  // check if user is authenticated
  if (req.session.logged_in) {
    // destroy session data
    req.session.destroy(() => {
      res.status(204).end();
    });
  // if no session, send 404
  } else {
    res.status(404).end();
  }
});

// export user routes as module
module.exports = router;