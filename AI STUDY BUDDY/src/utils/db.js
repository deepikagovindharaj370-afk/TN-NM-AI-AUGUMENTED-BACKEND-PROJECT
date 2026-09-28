const mongoose = require('mongoose');

const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error(`DB connection attempt ${i + 1} failed:`, err.message);
      if (i < retries - 1) {
        console.log('Retrying in 3 seconds...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.error('All retries failed. Exiting.');
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;