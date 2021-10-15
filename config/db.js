const mongoose = require("mongoose");

const connectDatabase = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {});

  console.log(`MongoDB connected:${conn.connection.host}`);
};

module.exports = connectDatabase;
