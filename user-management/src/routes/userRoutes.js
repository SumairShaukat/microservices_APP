import { Router } from 'express';
import { register, login } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import passport from '../config/passport.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to after successful authentication
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home or send user info
    res.json({ message: 'Login successful', user: req.user });
  });

export default router;