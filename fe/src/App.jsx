import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './navbar';
import Home from './Home';
import About from './About';
import Footer from './footer';
import Courses from './courses';
import Contact from './contact';
import Signup from './signup';
import Login from './login';
import Dashboard from './Component/Dashboard';
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [count, setCount] = useState(0)
   
  return (
    <>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />


        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
