import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  LoginUser,
  Logout,
  RegisterUser,
} from "./controller/auth/AuthController.js";
import {
  addProduct,
  getProducts,
} from "./controller/products/ProductController.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// allow every origin *
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); //this will take the token from header, and populate the req.cookies

app.post("/register", RegisterUser);
app.post("/login", LoginUser);
app.post("/logout", Logout);

// products routes protected with authMiddleware
app.post("/products/add", authMiddleware, addProduct);
app.get("/products", authMiddleware, getProducts);

app.get("/auth/me", authMiddleware, (req, res) => {
  return res.status(200).json({ user: req.myUserId });
});

app.listen(PORT, () => console.log("Server running on port 5000"));

mongoose
  .connect("mongodb://localhost:27017/jwt_basics")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
