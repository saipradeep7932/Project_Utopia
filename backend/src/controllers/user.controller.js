import {User} from '../models/user.model.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const existingByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingByEmail) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const existingByUsername = await User.findOne({ username: username.toLowerCase() });
    if (existingByUsername) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { registerUser };