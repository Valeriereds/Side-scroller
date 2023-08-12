const router = require('express').Router();
const  User  = require('../../models/User');
const Scores = require('../../models/Scores');

// router.post('/leaderboards', async (req, res) => {
//   try {
    
//   }
// })

// TODO still needs tested, attempting to get leaderboard scores data 
router.get('/', async (req, res) => {
    try {
        // Get all scores and JOIN with user data
        const scoresData = await Scores.findAll({
        include: [
            {
                model: User,
                attributes: ['player_name'],
            },
            ],
        });
        res.status(200).json(scoresData);
        // // Serialize data so the template can read it
        // const scores = scoresData.map((scores) => scores.get({ plain: true }));

        // // Pass serialized data and session flag into template
        // res.render('leaderboards', { 
        //     scores, 
        //     logged_in: req.session.logged_in 
        // });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;