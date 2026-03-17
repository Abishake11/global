const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Languages", "School Boards"],
    required: true,
  },
  subCategory: {
    type: String,
    enum: [
      "Tamil", "English", // Languages
      "CBSE", "ICSE", "Matriculation", "State Board", "IGCSE", "AS / A12", "IB – DP1 / DP2" // School Boards
    ],
    required: true,
  },
  details: {
    type: [String], // Array of bullet points for course details
    default: []
  },
  image: {
    type: String, // Optional URL or reference to image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
