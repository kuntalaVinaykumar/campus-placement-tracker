import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", { name, email, password });

      alert("Registration successful ✅ Please login");

      navigate("/");
    } catch (error) {
      alert("Registration failed ❌");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have account? <Link to="/">Login</Link>
      </p>
    </div>
  </div>
);
}

export default Register;
