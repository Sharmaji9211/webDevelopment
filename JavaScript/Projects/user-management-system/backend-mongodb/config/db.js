require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error('MongoDB connection URI is required in environment variables');
}

const client = new MongoClient(mongoUrl, {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 50,
  wtimeoutMS: 2500
});

let db;

async function connectToDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    db = client.db();
    await db.command({ ping: 1 }); // Test connection
    console.log('Successfully connected to MongoDB');
    return db;
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

async function closeConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = {
  connectToDatabase,
  getDb,
  closeConnection
};