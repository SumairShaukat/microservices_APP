import User from '../models/userModel.js';
import { hashedPass } from '../utils/hashPassword.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await hashedPass(password);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
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