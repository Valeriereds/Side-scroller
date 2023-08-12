const router = require('express').Router();
const { User, Scores }  = require('../../models');

// TODO still needs tested, attempting to get leaderboard scores data 
router.get('/', async (req, res) => {
    try {
        // Get all scores and JOIN with user data
        const scoreData = await Scores.findAll({
        include: [
            {
                model: User,
                attributes: ['player_name'],
            },
          ],
        });
        res.status(200).json(scoreData);
        // // Serialize data so the template can read it
        // const scores = scoreData.map((scores) => scores.get({ plain: true }));
    
        // // Pass serialized data and session flag into template
        // res.render('leaderboards', { 
        //     scores, 
        //     logged_in: req.session.logged_in 
        // });
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
        // const score = scoreData.get({ plain: true });
    
        // res.render('scores', {
        //   ...score,
        //   logged_in: req.session.logged_in
        // });
      } catch (err) {
        res.status(500).json(err);
      }
    });


module.exports = router;