 import express from "express"
import { authCheck, login, register } from "../../controller/Auth/authController.js"
import { authMiddleware } from "../../middleware/authMiddleware.js"

const router = express.Router()

router.get("/auth/me",authMiddleware, authCheck)
router.post("/register",register)
router.post("/login",login)

export default router