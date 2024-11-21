const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URl);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
