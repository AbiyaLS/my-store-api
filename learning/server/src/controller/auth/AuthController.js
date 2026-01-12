import User from "../../models/User.js";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password required" });
    }

    // password will be Hashed before saving

    const user = await User.create({ name, email, password });

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if email or password is missing
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // checking if such a email/user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // creating the token.
    const token = jwt.sign(
      { userId: user._id }, //payload to store in the token
      process.env.JWT_SECRET, //secret key to encrypt the token
      { expiresIn: "1h" } //options object
    );

    // prepares a cookie to be sent along with the response.
    // this cookie will be stored in the browser
    // browser will automatically send this cookie along with the every request
    // 3 args are:
    //   name of the cookie ('mytoken')
    //   value of the cookie, (token we created is the value we are storing in the cookie)
    //   options object
    res.cookie("mytoken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "Login Successful", token: token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
  } catch (error) {}
};

export { RegisterUser, LoginUser, Logout };
