const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  fieldName: String, // Subject / Specialization
  yearsOfExperience: String,
  resume: String
});

module.exports = mongoose.model("Teacher", TeacherSchema);
