import dotenv from "dotenv";

// Function to load and return environment variables
const loadConfig = () => {
  dotenv.config(); // Load environment variables from .env

  return {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    appleID: process.env.APPLE_CLIENT_ID || '',
    appleSecret: process.env.APPLE_CLIENT_SECRET || '',
  };
};

// Load and export the configuration variables
const config = loadConfig();

export const { port, dbUrl, jwtSecret, googleClientId, googleSecret, appleID, appleSecret } = config;
