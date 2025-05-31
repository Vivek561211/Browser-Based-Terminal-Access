const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // update if needed
  database: "sehack",
});

// ✅ User Registration
app.post("/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "user";

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists." });
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.json({ message: "User registered successfully!" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error hashing password" });
  }
});

// ✅ User Login
app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    if (results.length === 0) return res.status(401).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user });
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
