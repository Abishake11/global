require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const dbconnect = require("./config/config");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connect
dbconnect();

// =============================
// ROUTES
// =============================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/student", require("./routes/studentRoute.js"));
app.use("/api/teacher", require("./routes/teacherRoute.js"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/course", require("./routes/courseRoute"));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Backend working fine 🚀" });
});

// Server Start
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
