import { Sequelize } from 'sequelize';
import { dbUrl } from '../config/index.js';

const sequelize = new Sequelize(dbUrl, {
  host: 'localhost',
  dialect: 'postgres',
  logging: true
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

export default sequelize;