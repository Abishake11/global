import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role"); // "student" or "teacher"

    if (role === "student") navigate("/studentDashboard");
    else if (role === "teacher") navigate("/teacherDashboard");
    else navigate("/login"); // fallback
  }, []);

  return null; // Dashboard shows nothing, it just redirects
}
