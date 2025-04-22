console.log("Server setup successfully...");
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Enhanced configuration
const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '972027',
    database: 'shivam',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  server: {
    port: PORT,
    saltRounds: 10 // For password hashing if implemented
  }
};

// Create MySQL connection pool for better performance
const pool = mysql.createPool(config.db);

// Middleware
app.use(cors());
app.use(express.json());

// Helper function for database queries
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// ✅ ADMIN ROUTES

// Register Admin
app.post('/admin-register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validation
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if admin already exists
    const checkSql = 'SELECT * FROM admins WHERE email = ?';
    const existingAdmin = await query(checkSql, [email]);
    
    if (existingAdmin.length > 0) {
      return res.status(409).json({ error: 'Admin already exists with this email' });
    }

    // Insert new admin
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

    // Remove password from response
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

    // Check if user already exists
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

    // Check if user exists
    const checkSql = 'SELECT * FROM users WHERE id = ?';
    const existingUser = await query(checkSql, [userId]);
    
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user
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

    // Check if user exists
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
app.listen(config.server.port, () => {
  console.log(`Server is running on http://localhost:${config.server.port}`);
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