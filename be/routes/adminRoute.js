const router = require("express").Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// Hardcoded Admin Login (You can change these)
const ADMIN_USERNAME = "admin123";
const ADMIN_PASSWORD = "admin@123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(400).json({ success: false, message: "Invalid Admin Credentials" });
  }

  // Save admin session in frontend
  res.json({
    success: true,
    message: "Admin Login Successful",
    admin: { username }
  });
});



// DELETE a student
router.delete("/student/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted successfully" });
});

// DELETE a teacher
router.delete("/teacher/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted successfully" });
});

module.exports = router;

// Get all users (students + teachers)
router.get("/dashboard", async (req, res) => {
  try {
    const students = await Student.find().select("username email phone grade createdAt");
    const teachers = await Teacher.find().select("name email subject file createdAt");

    res.json({
      success: true,
      students,
      teachers
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
});

