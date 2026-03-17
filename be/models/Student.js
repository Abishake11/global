const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: String,
    schoolName: String,
    phone: String,
    email: { type: String, unique: true },
    grade: String,
    password: String,
    resume: String,

    // NEW FIELD (Optional)
    courses: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
