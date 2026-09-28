const PDFDocument = require('pdfkit');
const Summary = require('../models/Summary');
const Flashcard = require('../models/Flashcard');

// GET /api/export/summary/:id
exports.exportSummaryPDF = async (req, res) => {
  const summary = await Summary.findById(req.params.id);
  if (!summary) return res.status(404).json({ message: 'Summary not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('AI StudyBuddy — Summary', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(summary.summary);
  doc.end();
};

// GET /api/export/flashcards/:materialId
exports.exportFlashcardsPDF = async (req, res) => {
  const cards = await Flashcard.find({ materialId: req.params.materialId });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=flashcards.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('AI StudyBuddy — Flashcards', { underline: true });
  doc.moveDown();
  cards.forEach((c, i) => {
    doc.fontSize(13).text(`${i + 1}. Q: ${c.question}`);
    doc.fontSize(12).fillColor('gray').text(`   A: ${c.answer}`);
    doc.fillColor('black').moveDown(0.5);
  });
  doc.end();
};