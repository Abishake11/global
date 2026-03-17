import { useState } from "react";
import axios from "axios";
import './login.css'
import API_URL from "./config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    // ======================
    // 🔥 ADMIN LOGIN (FRONTEND ONLY)
    // ======================
    if (email === "admin123" && password === "admin@123") {
      alert("Admin Login Successful");

      localStorage.setItem("role", "admin");
      localStorage.setItem("admin", JSON.stringify({ username: "admin123" }));

      window.location.href = "/admin-dashboard";
      return;
    }


    // ======================
    // 🔥 STUDENT / TEACHER LOGIN
    // ======================
    try {
      const url = `${API_URL}/api/auth/login`;
      const payload = { email, password };

      const res = await axios.post(url, payload);

      alert(res.data.message);

      const role = res.data.role;
      localStorage.setItem("role", role);
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      if (role === "student") {
        localStorage.setItem("studentId", user._id);
      } else {
        localStorage.setItem("teacherId", user._id);
      }

      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-card">
      <form onSubmit={loginUser}>
        <h2>Login</h2>

        <div className="login-validate">
          <input
            placeholder="Email (or Admin Username)"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          
          <div className="remember-me" style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px'}}>
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              style={{width: 'auto', marginBottom: '0'}}
            />
            <label htmlFor="remember" style={{fontSize: '14px', color: '#333'}}>Remember Me</label>
          </div>

          <button type="submit">Login</button>
        </div>

      </form>
    </div>

  );
}

export default Login;
