import {port} from './config/index.js'
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/dbConfig.js';
import passport from './config/passport.js';
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(passport.initialize());




sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));


app.listen(port, () => {
  console.log(`User Management Service running on port ${port}`);
});







.3