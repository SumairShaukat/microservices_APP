import User from '../models/userModel.js';
import { hashedPass, comparePasses } from '../utils/hashPassword.js';
import { generateToken,  verifyToken } from '../utils/jwt.js';

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

    // Produce a UserRegistered event to Kafka
    await producer.send({
      topic: 'user-events',
      messages: [
        {
          key: user.id.toString(), // user ID as key
          value: JSON.stringify({
            eventType: 'UserRegistered',
            data: {
              userId: user.id,
              email: user.email,
              name: user.name,
              provider: user.provider,
            },
          }),
        },
      ],
    });

    console.log('UserRegistered event produced to Kafka successfully.');

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
    if (user && await comparePasses(password, user.password)) {
      const token = generateToken(user.id);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};
export const getAllUsers = async (req, res) => {
  try {

      const users = await User.findAll(); 
      console.log("Users fetched:", users); // Log the fetched users
      // Fetch all users from the database
      return res.status(200).json(users); // Respond with a 200 status and the list of users
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving users', error }); // Handle any errors
  }
};