import User from '../models/userModel.js';
import { hashedPass } from '../utils/hashPassword.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  console.log('Request Body:', req.body); // Log incoming request body

  const { email, password, name, provider } = req.body;

  // Validate required fields
  if (!email || !provider) {
    return res.status(400).json({ message: 'Email and provider are required.' });
  }

  try {
    // Hash password only if provider is "local"
    const hashedPassword = provider === 'local' ? await hashedPass(password, 10) : null;

    // Create the user
    const user = await User.create({ email, password: hashedPassword, name, provider });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await comparePassword(password, user.password)) {
      const token = generateToken(user.id);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};