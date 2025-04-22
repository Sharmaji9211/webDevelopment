require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { connectToDatabase, getDb, closeConnection } = require('./config/db');

const app = express();

// Configuration
const config = {
  collections: {
    admins: 'admins',
    users: 'users'
  },
  server: {
    port: process.env.PORT || 3000,
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    environment: process.env.NODE_ENV || 'development'
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: config.server.environment,
    timestamp: new Date().toISOString()
  });
});

// ✅ ADMIN ROUTES

// Register Admin
app.post('/admin-register', async (req, res) => {
  try {
    const db = getDb();
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingAdmin = await db.collection(config.collections.admins).findOne({ email });
    
    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists with this email' });
    }

    const result = await db.collection(config.collections.admins).insertOne({
      firstname,
      lastname,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'admin'
    });
    
    res.status(201).json({ 
      message: 'Admin registered successfully', 
      adminId: result.insertedId 
    });

  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Login
app.post('/admin-login', async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await db.collection(config.collections.admins).findOne({
      email,
      password
    });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { password: _, ...adminWithoutPassword } = admin;

    res.status(200).json({ 
      message: 'Login successful', 
      admin: adminWithoutPassword 
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
    const db = getDb();
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await db.collection(config.collections.users).findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    const result = await db.collection(config.collections.users).insertOne({
      firstname,
      lastname,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user'
    });
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: result.insertedId 
    });

  } catch (err) {
    console.error('User registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection(config.collections.users)
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    
    res.status(200).json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Single User
app.get('/users/:id', async (req, res) => {
  try {
    const db = getDb();
    const userId = req.params.id;
    
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await db.collection(config.collections.users).findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User
app.put('/users/:id', async (req, res) => {
  try {
    const db = getDb();
    const userId = req.params.id;
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({ error: 'First name, last name and email are required' });
    }

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const existingUser = await db.collection(config.collections.users).findOne(
      { _id: new ObjectId(userId) }
    );
    
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updateData = {
      firstname,
      lastname,
      email,
      updatedAt: new Date()
    };

    if (password) {
      updateData.password = password;
    }

    await db.collection(config.collections.users).updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
    
    res.status(200).json({ message: 'User updated successfully' });

  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  try {
    const db = getDb();
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const existingUser = await db.collection(config.collections.users).findOne(
      { _id: new ObjectId(userId) }
    );
    
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db.collection(config.collections.users).deleteOne(
      { _id: new ObjectId(userId) }
    );
    
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

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(config.server.port, () => {
    console.log(`Server is running in ${config.server.environment} mode on http://localhost:${config.server.port}`);
    console.log("Server setup successfully...");
  });
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await closeConnection();
  process.exit(0);
});