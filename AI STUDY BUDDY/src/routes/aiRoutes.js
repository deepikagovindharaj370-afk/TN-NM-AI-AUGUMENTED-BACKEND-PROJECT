const router = require('express').Router();
const { protect } = require('../middleware/auth');
const ai = require('../controllers/aiController');

router.post('/materials/:id/summarize', protect, ai.generateSummary);
router.post('/:id/flashcards', protect, ai.generateFlashcards);
router.post('/:id/quiz', protect, ai.generateQuiz);
router.post('/study-plan', protect, ai.generateStudyPlan);

module.exports = router;