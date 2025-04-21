const express = require('express');
const router = express.Router();

let users = [
  { email: "alice@example.com", password: "alice123" },
  { email: "bob@example.com", password: "bob123" },
  { email: "charlie@example.com", password: "charlie123" },
];

router.post('/user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const existing = users.find(user => user.email === email);
  if (existing) {
    return res.status(409).json({ message: "Email already exists." });
  }

  users.push({ email, password });
  res.status(201).json({ message: "User created successfully." });
});


router.get('/users', (req, res) => {
  res.json(users);
});


router.put('/user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = users.find(user => user.email === email);
  if (user) {
    user.password = password;
    return res.json({ message: "User updated successfully." });
  } else {
    return res.status(404).json({ message: "Email not found" });
  }
});


router.delete('/user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const index = users.findIndex(user => user.email === email);
  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ message: "User deleted successfully" });
  } else {
    return res.status(404).json({ message: "Email not found" });
  }
});

module.exports = router;
