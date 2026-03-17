import { useEffect, useState } from "react";
import axios from "axios";
import './teacherdashboard.css'
import API_URL from "../config";

function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [noId, setNoId] = useState(false); // NEW → handle missing teacherId

  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    console.log("Teacher ID:", id);

    if (!id) {
      setNoId(true);     // Show message instead of infinite loading
      return;
    }

    axios
      .get(`${API_URL}/api/teacher/dashboard?id=${id}`)
      .then((res) => {
        console.log("Teacher Dashboard Response:", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Teacher Dashboard Error:", err);
        setData({ name: "", courses: [] }); // Prevent infinite loading
      });
  }, []);

  // If teacherId missing
  if (noId) {
    return <h2>No teacherId found. Please login again.</h2>;
  }

  // Still loading?
  if (!data) return <h2>Loading...</h2>;

  return (
    <>
      <div className="teacher-dashboard">
        <div className="container">
          <div className="dashboard-card">
            <h1>Welcome {data.name}</h1>
            
            <div className="teacher-details">
              <h3>Your Details:</h3>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Phone:</strong> {data.phone}</p>
              <p><strong>Field / Specialization:</strong> {data.fieldName}</p>
              <p><strong>Years of Experience:</strong> {data.yearsOfExperience}</p>
              {data.resume && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={`${API_URL}/uploads/teachers/${data.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
