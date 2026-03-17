const router = require("express").Router();
const Teacher = require("../models/Teacher");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads/teachers");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/teachers");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const { name, phone, email, fieldName, yearsOfExperience, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name,
      phone,
      email,
      fieldName,
      yearsOfExperience,
      password: hashedPassword,
      resume: req.file ? req.file.filename : null,
    });

    res.json({
      success: true,
      message: "Teacher created successfully!",
      teacher,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ success: false, message: "Teacher ID required" });

    const teacher = await Teacher.findById(id).select("-password -__v");
    if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

    res.json(teacher);
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
