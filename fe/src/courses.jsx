import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./courses.css";
import API_URL from "./config";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/course`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleExplore = (course) => {
    const role = localStorage.getItem("role");
    if (!role) {
      alert("Please login or signup to explore course details.");
      navigate("/login");
    } else {
      setSelectedCourse(course);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Group courses by Category -> SubCategory
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.category]) acc[course.category] = {};
    if (!acc[course.category][course.subCategory]) {
      acc[course.category][course.subCategory] = [];
    }
    acc[course.category][course.subCategory].push(course);
    return acc;
  }, {});

  if (loading) {
    return <div className="text-center py-5"><h2>Loading Courses...</h2></div>;
  }

  return (
    <div className="course-space py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 text-primary">Explore Our Courses</h1>
          <p className="text-muted lead">Discover specialized programs designed for your success.</p>
        </div>

        {Object.keys(groupedCourses).length === 0 ? (
          <div className="text-center">
            <h4>No courses available at the moment. Please check back later!</h4>
          </div>
        ) : (
          Object.keys(groupedCourses).map((category) => (
            <div key={category} className="mb-5">
              <h2 className="mb-4 text-uppercase fw-bold text-secondary border-bottom pb-2">
                {category}
              </h2>

              {Object.keys(groupedCourses[category]).map((subCategory) => (
                <div key={subCategory} className="mb-4 ps-3">
                  <h3 className="mb-3 text-info fw-semibold">{subCategory}</h3>
                  <div className="row g-4">
                    {groupedCourses[category][subCategory].map((course) => (
                      <div className="col-md-6 col-lg-4" key={course._id}>
                        <div className="card h-100 shadow-sm border-0 course-card-hover">
                          <div className="card-header bg-primary text-white text-center py-3">
                            <h5 className="mb-0 fw-bold">{course.title}</h5>
                          </div>
                          <div className="card-body d-flex flex-column">
                            <p className="card-text text-muted mb-4">{course.description}</p>
                            <div className="mt-auto">
                              <button 
                                onClick={() => handleExplore(course)} 
                                className="btn btn-outline-primary w-100 fw-bold rounded-pill shadow-sm"
                              >
                                Explore Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Course Details Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold">
            {selectedCourse?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedCourse && (
            <>
              <div className="mb-4">
                <h5 className="text-secondary fw-bold border-bottom pb-2">Description</h5>
                <p className="text-muted fs-5">{selectedCourse.description}</p>
              </div>
              
              {selectedCourse.details && selectedCourse.details.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-secondary fw-bold border-bottom pb-2">Course Details & Features</h5>
                  <ul className="list-group list-group-flush mt-3">
                    {selectedCourse.details.map((detail, index) => (
                      <li key={index} className="list-group-item d-flex align-items-center border-0 border-bottom">
                        <span className="text-primary me-2 fw-bold">✓</span> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top-0 d-flex justify-content-between p-4">
          <Button variant="outline-secondary" onClick={handleClose} className="rounded-pill px-4">
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose(); navigate('/contact'); }} className="rounded-pill px-4 shadow-sm fw-bold">
            Inquire Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Courses;