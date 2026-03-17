import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import API_URL from "./config";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";

    const re = /\S+@\S+\.\S+/;
    if (!re.test(form.email)) return "Enter a valid email.";

    if (!form.message.trim()) return "Message cannot be empty.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    const err = validate();
    if (err) {
      setFeedback({ type: "danger", message: err });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/contact`, form);

      setFeedback({
        type: "success",
        message: res.data?.message || "Message sent — thank you!"
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Server error — please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="row gy-4 align-items-center">

          {/* {left side info} */}
          <div className="col-lg-5">
            <div className="card border-0 p-4 h-100">
              <h4 className="mb-3 title">Contact Us</h4>
              <p className="mb-4 text-muted">
                Have questions or need help? Send a message or reach us through any of the options below.
              </p>

              <ul className="list-unstyled mb-3">
                <li className="mb-2">
                  <strong>Address:</strong>
                  <div className="text-muted">123 Global Tuition St, Cityname, State</div>
                </li>

                <li className="mb-2">
                  <strong>Phone:</strong>
                  <div className="text-muted">
                    <a href="tel:+911234567890" className="link-dark">
                      +91 12345 67890
                    </a>
                  </div>
                </li>

                <li className="mb-2">
                  <strong>Email:</strong>
                  <div className="text-muted">
                    <a href="mailto:info@globaltuition.com" className="link-dark">
                      info@globaltuition.com
                    </a>
                  </div>
                </li>

                <li className="mb-2">
                  <strong>Hours:</strong>
                  <div className="text-muted">Mon — Fri: 9:00 AM — 6:00 PM</div>
                </li>
              </ul>

              <div className="mt-3 follow">
                <strong>Follow us</strong>
                <div className="d-flex gap-2 mt-2">
                  <a href="#" className="btn  btn-sm">Facebook</a>
                  <a href="#" className="btn  btn-sm">Instagram</a>
                  <a href="#" className="btn  btn-sm">Twitter</a>
                </div>
              </div>
            </div>
          </div>

          {/* right side info*/}  
          <div className="col-lg-7 mt-0">
            <div className="card border-0 p-4">
              <h4 className="mb-0 mx-5 title2">Send us a message</h4>

              {feedback.message && (
                <div className={`alert alert-${feedback.type} py-2 mt-3`} role="alert">
                  {feedback.message}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-3">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full name</label>
                    <input
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Subject</label>
                    <input
                      name="subject"
                      className="form-control"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Short subject"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      className="form-control"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="col-12 d-flex align-items-center gap-3">
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? "Sending..." : "Send message"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "",
                          message: ""
                        })
                      }
                    >
                      Reset
                    </button>

                    <div className="ms-auto text-muted small">We reply within 24 hours</div>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
