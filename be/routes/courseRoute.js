const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error("Fetch Courses Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Fetch Course Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST new course
router.post("/", async (req, res) => {
  try {
    const { title, description, category, subCategory, details, image } = req.body;
    
    if (!title || !description || !category || !subCategory) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newCourse = new Course({
      title,
      description,
      category,
      subCategory,
      details,
      image
    });

    await newCourse.save();
    res.json({ message: "Course created successfully!", course: newCourse });
  } catch (err) {
    console.error("Create Course Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update course
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category, subCategory, details, image } = req.body;
    
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, category, subCategory, details, image },
      { new: true }
    );

    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course updated successfully!", course: updatedCourse });
  } catch (err) {
    console.error("Update Course Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted successfully!" });
  } catch (err) {
    console.error("Delete Course Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
