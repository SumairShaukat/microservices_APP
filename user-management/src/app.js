import express from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/dbConfig.js';
import  session  from 'express-session';
import passport from './config/passport.js';
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(passport.initialize());
app.use(passport.session());




sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Database connection error:', err));

  sequelize.sync({force: true})
  .then(() => console.log('Database & tables created!'));
export default app;