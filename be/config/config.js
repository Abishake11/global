const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) throw new Error("MONGO_URL not set in .env");
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = dbconnect;
