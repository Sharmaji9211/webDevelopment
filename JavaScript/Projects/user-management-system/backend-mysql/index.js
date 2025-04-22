require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { query, pool } = require('./config/db');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ADMIN ROUTES

// Register Admin
app.post('/admin-register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const checkSql = 'SELECT * FROM admins WHERE email = ?';
    const existingAdmin = await query(checkSql, [email]);
    
    if (existingAdmin.length > 0) {
      return res.status(409).json({ error: 'Admin already exists with this email' });
    }

    const insertSql = 'INSERT INTO admins (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    const result = await query(insertSql, [firstname, lastname, email, password]);
    
    res.status(201).json({ 
      message: 'Admin registered successfully', 
      adminId: result.insertId 
    });

  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Login
app.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';
    const results = await query(sql, [email, password]);
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = results[0];
    delete admin.password;

    res.status(200).json({ 
      message: 'Login successful', 
      admin: admin 
    });

  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ CLIENT USER ROUTES

// Register Client User
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const checkSql = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await query(checkSql, [email]);
    
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    const insertSql = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    const result = await query(insertSql, [firstname, lastname, email, password]);
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: result.insertId 
    });

  } catch (err) {
    console.error('User registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const sql = 'SELECT id, firstname, lastname, email FROM users';
    const users = await query(sql);
    
    res.status(200).json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Single User
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = 'SELECT id, firstname, lastname, email FROM users WHERE id = ?';
    const user = await query(sql, [userId]);
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user[0]);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({ error: 'First name, last name and email are required' });
    }

    const checkSql = 'SELECT * FROM users WHERE id = ?';
    const existingUser = await query(checkSql, [userId]);
    
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updateSql = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ?';
    await query(updateSql, [firstname, lastname, email, password || existingUser[0].password, userId]);
    
    res.status(200).json({ message: 'User updated successfully' });

  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const checkSql = 'SELECT * FROM users WHERE id = ?';
    const existingUser = await query(checkSql, [userId]);
    
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deleteSql = 'DELETE FROM users WHERE id = ?';
    await query(deleteSql, [userId]);
    
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  pool.end();
  process.exit(0);
});

process.on('SIGINT', () => {
  pool.end();
  process.exit(0);
});

console.log("Server setup successfully...");