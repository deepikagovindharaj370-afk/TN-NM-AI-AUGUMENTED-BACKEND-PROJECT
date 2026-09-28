const router = require('express').Router();
const { protect } = require('../middleware/auth');
const g = require('../controllers/gamificationController');

router.get('/me', protect, g.getMyProfile);
router.get('/leaderboard', protect, g.getLeaderboard);

module.exports = router;