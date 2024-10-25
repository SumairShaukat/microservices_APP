import { Sequelize } from 'sequelize';
import config from './index.js';

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: false, // Disable logging if you don't want to see SQL queries in the console
});

export default sequelize;