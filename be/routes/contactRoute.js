const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    await newContact.save();

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact API Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all contact messages (Admin)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Fetch Contacts Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
