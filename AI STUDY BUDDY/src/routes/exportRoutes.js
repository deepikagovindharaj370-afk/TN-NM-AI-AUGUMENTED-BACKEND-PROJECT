const router = require('express').Router();
const { protect } = require('../middleware/auth');
const e = require('../controllers/exportController');

router.get('/summary/:id', protect, e.exportSummaryPDF);

module.exports = router;