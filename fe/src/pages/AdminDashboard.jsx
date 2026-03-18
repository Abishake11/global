import { useEffect, useState } from "react";
import axios from "axios";
import './admindashboard.css'
import API_URL from "../config";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [courseForm, setCourseForm] = useState({
    title: "", description: "", category: "Languages", subCategory: "Tamil", details: ""
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/dashboard`);
      setStudents(res.data.students);
      setTeachers(res.data.teachers);

      const courseRes = await axios.get(`${API_URL}/api/course`);
      setCourses(courseRes.data);

      const contactRes = await axios.get(`${API_URL}/api/contact`);
      setContacts(contactRes.data);
    } catch (err) {
      console.error("Dashboard Fetch Error", err);
    }
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/api/admin/student/${id}`);
    alert("Student Deleted");
    fetchData();
  };

  const deleteTeacher = async (id) => {
    await axios.delete(`${API_URL}/api/admin/teacher/${id}`);
    alert("Teacher Deleted");
    fetchData();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${API_URL}/api/course/${id}`);
    alert("Course Deleted");
    fetchData();
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDetails = courseForm.details.split(",").map(d => d.trim());
      await axios.post(`${API_URL}/api/course`, { ...courseForm, details: formattedDetails });
      alert("Course Created Successfully");
      setCourseForm({ title: "", description: "", category: "Languages", subCategory: "Tamil", details: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="admin-board">
        <div className="container">
          {/* student list  */}
          <h2>Students List</h2>
          <table border="1" cellPadding="20">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone || "N/A"}</td>
                  <td>{s.grade || "N/A"}</td>

                  <td>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this student permanently?")) {
                          deleteStudent(s._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* teacher list  */}
          <h2>Teachers List</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject / Spec.</th>
                <th>Resume</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.fieldName}</td>

                  {/* File Preview / Download */}
                  <td>
                    <a
                      href={t.resume && t.resume.startsWith("http") ? t.resume : `${API_URL}/uploads/teachers/${t.resume}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this teacher permanently?")) {
                          deleteTeacher(t._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* COURSE MANAGEMENT SECTION */}
          <h2 style={{ marginTop: '2rem' }}>Course Management</h2>
          <div style={{ background: 'rgb(251, 250, 223)', padding: '1rem', marginBottom: '1rem', borderRadius: '5px' }}>
            <h3>Add New Course</h3>
            <form onSubmit={handleCourseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
              <input required type="text" placeholder="Title" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
              <textarea required placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}></textarea>
              <select value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value, subCategory: e.target.value === "Languages" ? "Tamil" : "CBSE" })}>
                <option value="Languages">Languages</option>
                <option value="School Boards">School Boards</option>
              </select>
              <select value={courseForm.subCategory} onChange={(e) => setCourseForm({ ...courseForm, subCategory: e.target.value })}>
                {courseForm.category === "Languages" ? (
                  <>
                    <option value="Tamil">Tamil</option>
                    <option value="English">English</option>
                  </>
                ) : (
                  <>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="Matriculation">Matriculation</option>
                    <option value="State Board">State Board</option>
                    <option value="IGCSE">IGCSE</option>
                    <option value="AS / A12">AS / A12</option>
                    <option value="IB – DP1 / DP2">IB – DP1 / DP2</option>
                  </>
                )}
              </select>
              <input type="text" placeholder="Details (Comma separated)" value={courseForm.details} onChange={(e) => setCourseForm({ ...courseForm, details: e.target.value })} />
              <button type="submit" style={{ padding: '0.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Add Course</button>
            </form>
          </div>

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c.subCategory}</td>
                  <td>
                    <button onClick={() => { if (window.confirm("Delete course?")) deleteCourse(c._id); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CONTACT MESSAGES SECTION */}
          <h2 style={{ marginTop: '2rem' }}>Contact Messages</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject || "N/A"}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




    </>

  );
}

export default AdminDashboard;
