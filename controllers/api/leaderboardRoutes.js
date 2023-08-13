const router = require('express').Router();
const { User, Scores }  = require('../../models');
const withAuth = require('../../utils/auth');

// TODO still needs tested, attempting to get leaderboard scores data 
router.get('/', async (req, res) => {
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
        res.status(200).json(scoreData);
        console.log(scoreData);
        // // Serialize data so the template can read it
        // const scores = scoreData.map((scores) => scores.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('leaderboards', { 
            scores, 
            logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err.message);
      }
    });

router.get('/:id', async (req, res) => {
    try {
      const scoreData = await Scores.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['player_name'],
          },
        ],
      });
        res.status(200).json(scoreData)
        const score = scoreData.get({ plain: true });
    
        res.render('leaderboards', {
          ...score,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
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