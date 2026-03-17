const router = require("express").Router();
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/students");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/students");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const { name, schoolName, phone, email, grade, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      schoolName,
      phone,
      email,
      grade,
      password: hashedPassword,
      resume: req.file ? req.file.filename : null,
    });

    res.json({
      success: true,
      message: "Account created successfully!",
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Signup failed",
      error: err.message,
    });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({ success: false, message: "Student ID missing" });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      name: student.name,
      email: student.email,
      courses: student.courses || [], // optional
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Dashboard error" });
  }
});

module.exports = router;
