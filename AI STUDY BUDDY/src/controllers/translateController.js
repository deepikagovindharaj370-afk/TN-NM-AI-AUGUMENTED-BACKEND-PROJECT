const Summary = require('../models/Summary');
const TranslatedContent = require('../models/TranslatedContent');
const { generateContent } = require('../utils/gemini');

// POST /api/translate/summary/:id   body: { language: "Tamil" }
exports.translateSummary = async (req, res) => {
  const { language } = req.body;
  const summary = await Summary.findById(req.params.id);
  if (!summary) return res.status(404).json({ message: 'Summary not found' });

  const prompt = `Translate the following text into ${language}. Return only the translation:\n\n${summary.summary}`;
  const translatedText = await generateContent(prompt);

  const record = await TranslatedContent.create({
    userId: req.user.id,
    sourceType: 'summary',
    sourceId: summary._id,
    language,
    translatedText,
  });
  res.json(record);
};