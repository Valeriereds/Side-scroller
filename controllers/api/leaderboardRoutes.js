const router = require('express').Router();
const { User, Scores }  = require('../../models');


// Get all scores and JOIN with user data
router.get('/', async (req, res) => {
    try {
        const scoreData = await Scores.findAll({
        include: [
            {
                model: User,
                attributes: ['player_name'],
            }],
        order: [['score', 'DESC']],
        limit: 5,
        });
        res.status(200).json(scoreData);
      } catch (err) {
        res.status(500).json(err.message);
      }
    });

router.post('/', async (req, res) => {
  const body = req.body;
      try {
        const newScore = await Scores.create({...body, user_id: req.session.user_id});
        res.status(200).json(newScore);
      } catch (err) {
        res.status(400).json(err);
      }
    });

module.exports = router;
