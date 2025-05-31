import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserLogin.css";  // keep your styling or add your own

const UserLogin = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        email: formData.email,
        password: formData.password,
      });
      const { user } = res.data;
      saveUser(user);
      navigate(`/user/${user.id}/terminal`);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const registerUser = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert(res.data.message);
      setIsRegister(false);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      const { name, email, password, confirmPassword } = formData;
      if (!name || !email || !password || !confirmPassword) {
        setError("All fields are required.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      registerUser();
    } else {
      if (!formData.email || !formData.password) {
        setError("Email and password are required.");
        return;
      }
      loginUser();
    }
  };

  return (
    <div className="user-login-container" style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>{isRegister ? "Register" : "Login"}</h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <button
          onClick={() => setIsRegister(false)}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            backgroundColor: !isRegister ? "#007bff" : "#f0f0f0",
            color: !isRegister ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          Log In
        </button>
        <button
          onClick={() => setIsRegister(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: isRegister ? "#007bff" : "#f0f0f0",
            color: isRegister ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          Register
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginBottom: 10, textAlign: "center" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
        />
        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
          />
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          {isRegister ? "Register" : "Log In"}
        </button>
      </form>

      <p style={{ marginTop: 15, textAlign: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
          ← Back to Home
        </Link>
      </p>
    </div>
  );
};

export default UserLogin;
