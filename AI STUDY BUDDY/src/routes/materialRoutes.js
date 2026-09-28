const router = require('express').Router();
const { protect } = require('../middleware/auth');
const { uploadMaterial, getMyMaterials } = require('../controllers/materialController');

router.post('/upload', protect, uploadMaterial);
router.get('/', protect, getMyMaterials);

module.exports = router;