import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../../model/user_model.js";

// AUTH CHECK
export const authCheck = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Authenticated",
      userId: req.userId
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 4) {
      return res.status(400).json({
        message: "Password must be at least 4 characters"
      });
    }

    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWt_SECERT,
      { expiresIn: "1h" }
    );

    res.cookie("myToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false // true in production
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
