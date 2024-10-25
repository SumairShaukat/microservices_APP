import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleSecret: process.env.GOOGLE_CLIENT_SECRET,
  appleID: process.env.APPLE_CLIENT_ID,
  appleSecret: process.env.APPLE_CLIENT_SECRET,
};

