import './navbar.css';
import logo from './assets/got.logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const studentId = localStorage.getItem("studentId");
        const teacherId = localStorage.getItem("teacherId");
        const savedRole = localStorage.getItem("role");

        setRole(savedRole);

        if (studentId || teacherId || savedRole === "admin") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setRole(null);
        navigate("/");
    };

    return (
        <>
            <nav className="navbar navbar-expand-md">
                <div className="container-fluid align-items-center">
                    <div className='d-flex align-items-center gap-3'>
                        <img src={logo} alt="" width="80px" />
                        <h4 className='mt-3'>GLOBAL ONLINE TUITION</h4>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/course">Courses</Link>
                            </li>

                            {/* Student / Teacher Dashboard */}
                            {isLoggedIn && role !== "admin" && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                            )}

                            {/* ADMIN DASHBOARD */}
                            {role === "admin" && (
                                <li className="nav-item">
                                    <Link className="nav-link text-warning fw-bold" to="/admin-dashboard">
                                        Admin Panel
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>

                            {!isLoggedIn && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                        Accounts
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/signup">Sign up</Link></li>
                                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </ul>
                                </li>
                            )}

                            {isLoggedIn && (
                                <li className="nav-item">
                                    <button className="nav-link btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
