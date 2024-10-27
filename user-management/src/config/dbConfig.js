import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
const myconfig = {
url: process.env.DATABASE_URL
}
const sequelize = new Sequelize(myconfig.url, {
  host: 'localhost',
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

export default sequelize;