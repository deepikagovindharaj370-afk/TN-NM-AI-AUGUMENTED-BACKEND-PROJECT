const Material = require('../models/Material');
const Summary = require('../models/Summary')
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
const StudyPlan = require('../models/StudyPlan');
const { generateContent } = require('../utils/gemini');
const { addPoints } = require('./gamificationController'); // gamification hook

exports.generateSummary = async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });

  const prompt = `Summarize this study material in under 200 words:\n\n${material.content}`;
  const text = await generateContent(prompt);

  const summary = await Summary.create({ userId: req.user.id, materialId: material._id, summary: text });
  await addPoints(req.user.id, 10, 'Generated a summary'); // +10 points

  res.json(summary);
};

exports.generateFlashcards = async (req, res) => {
  const material = await Material.findById(req.params.id);
  const prompt = `Create 8 flashcards (question/answer pairs) as a JSON array
[{ "question": "...", "answer": "..." }] from this content:\n\n${material.content}`;
  const raw = await generateContent(prompt);
  const cards = JSON.parse(raw.replace(/```json|```/g, '').trim());

  const saved = await Flashcard.insertMany(
    cards.map(c => ({ userId: req.user.id, materialId: material._id, ...c }))
  );
  await addPoints(req.user.id, 15, 'Generated flashcards');
  res.json(saved);
};

exports.generateQuiz = async (req, res) => {
  const material = await Material.findById(req.params.id);
  const prompt = `Create 5 multiple-choice questions as JSON:
[{ "question": "...", "options": ["A","B","C","D"], "correctAnswer": "A" }]
from this content:\n\n${material.content}`;
  const raw = await generateContent(prompt);
  const questions = JSON.parse(raw.replace(/```json|```/g, '').trim());

  const quiz = await Quiz.create({ userId: req.user.id, materialId: material._id, questions });
  await addPoints(req.user.id, 20, 'Generated a quiz');
  res.json(quiz);
};

exports.generateStudyPlan = async (req, res) => {
  const { subject, examDate, hoursPerDay } = req.body;
  const prompt = `Create a day-by-day study plan for "${subject}" for a student who has
${hoursPerDay} hours/day until ${examDate}. Return as plain text with dates.`;
  const text = await generateContent(prompt);

  const plan = await StudyPlan.create({ userId: req.user.id, studyPlan: text, examDate });
  res.json(plan);
};