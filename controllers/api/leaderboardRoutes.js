// import express router and User and Scores models
const router = require('express').Router();
const { User, Scores }  = require('../../models');

// GET method to read all scores
router.get('/', async (req, res) => {
  try {
    // read scores and JOIN with user data
    const scoreData = await Scores.findAll({
    include: [
      {
        model: User,
        attributes: ['player_name'],
      }],
    // filter for 5 highest scores to display on leaderboard
    order: [['score', 'DESC']],
    limit: 5,
    });
    res.status(200).json(scoreData);
    // catch any errors and send error response
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST method to create new score
router.post('/', async (req, res) => {
  // create score when user's game ends
  const body = req.body;
  try {
    const newScore = await Scores.create({...body, user_id: req.session.user_id});
    res.status(200).json(newScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

// export leaderboard routes as module
module.exports = router;