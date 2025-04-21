const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./user');

// Middleware
app.use(express.json());

// Use external user route handler
app.use('/', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('User Management API is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
