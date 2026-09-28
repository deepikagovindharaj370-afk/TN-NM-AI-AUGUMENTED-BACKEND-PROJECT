require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/db');
const authRoutes = require('./src/routes/authRoutes');
const materialRoutes = require('./src/routes/materialRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const gamificationRoutes = require('./src/routes/gamificationRoutes');
const translateRoutes = require('./src/routes/translateRoutes');
const exportRoutes = require('./src/routes/exportRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI StudyBuddy API running');
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
app.use('/api/auth', authRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/export', exportRoutes);