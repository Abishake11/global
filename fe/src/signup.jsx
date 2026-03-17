import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import API_URL from "./config";

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // "student" or "teacher"

  // Unified state for both, we'll only submit relevant fields based on role
  const [formData, setFormData] = useState({
    name: "",
    schoolName: "",
    phone: "",
    email: "",
    grade: "", // Student
    fieldName: "", // Teacher
    yearsOfExperience: "", // Teacher
    password: "",
  });

  const [resume, setResume] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("password", formData.password);
    
    if (resume) {
      data.append("resume", resume);
    }

    let url = "";

    if (role === "student") {
      url = `${API_URL}/api/student/signup`;
      data.append("schoolName", formData.schoolName);
      data.append("grade", formData.grade);
    } else {
      url = `${API_URL}/api/teacher/signup`;
      data.append("fieldName", formData.fieldName);
      data.append("yearsOfExperience", formData.yearsOfExperience);
    }

    try {
      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="row align-items-center justify-content-center">
  

          {/* Right Side */}
          <div className="col-5">
            <div className="card shadow-sm border-0 rounded-4" style={{ padding: '2rem' }}>
              <h4 className="text-center mb-4">Create New Account</h4>

              <div className="d-flex justify-content-center mb-4 gap-3">
                <button 
                  className={`btn ${role === "student" ? "btn-primary" : "btn-outline-primary"}`} 
                  onClick={() => setRole("student")}
                >
                  Student
                </button>
                <button 
                  className={`btn ${role === "teacher" ? "btn-primary" : "btn-outline-primary"}`} 
                  onClick={() => setRole("teacher")}
                >
                  Teacher
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address (Gmail)</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    required
                  />
                </div>

                {role === "student" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">School Name</label>
                      <input
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Grade</label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Grade</option>
                        <option value="1-5">1–5</option>
                        <option value="6-9">6–9</option>
                        <option value="10-12">10–12</option>
                      </select>
                    </div>
                  </>
                )}

                {role === "teacher" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Field Name (Subject / Specialization)</label>
                      <input
                        name="fieldName"
                        value={formData.fieldName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Years of Experience</label>
                      <input
                        name="yearsOfExperience"
                        type="number"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    required
                  />
                </div>

                {role === "teacher" && (
                  <div className="mb-3">
                    <label className="form-label">Upload Resume (PDF/Word)</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                      required
                    />
                  </div>
                )}

                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="rememberMe" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Signup as {role === "student" ? "Student" : "Teacher"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
