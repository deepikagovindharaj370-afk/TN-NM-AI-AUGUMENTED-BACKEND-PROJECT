const router = require('express').Router();
const { protect } = require('../middleware/auth');
const t = require('../controllers/translateController');

router.post('/summary/:id', protect, t.translateSummary);

module.exports = router;