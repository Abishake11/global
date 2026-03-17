import { useEffect, useState } from "react";
import axios from "axios";
import './studentdashboard.css';
import API_URL from "../config";

function StudentDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    if (!id) return;

    axios
      .get(`${API_URL}/api/student/dashboard?id=${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Dashboard Error:", err));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <>
      <div className="student-dashboard">
        <div className="container">
 <div>
          <h1>Welcome {data.username}</h1>

          <h3>Your Courses:</h3>
          {data.courses.length === 0 ? (
            <p>No courses purchased yet.</p>
          ) : (
            <ul>
              {data.courses.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>
    </>

  );
}

export default StudentDashboard;
