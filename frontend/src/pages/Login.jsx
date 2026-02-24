import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials ❌");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don’t have account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
);

}

export default Login;
