const router = require("express").Router();
const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { put } = require("@vercel/blob");
const fs = require("fs");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", upload.single("resume"), async (req, res) => {
  try {
    const { name, schoolName, phone, email, grade, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let resumeUrl = null;
    if (req.file) {
      const blob = await put(Date.now() + "-" + req.file.originalname, req.file.buffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      resumeUrl = blob.url;
    }

    const student = await Student.create({
      name,
      schoolName,
      phone,
      email,
      grade,
      password: hashedPassword,
      resume: resumeUrl,
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
