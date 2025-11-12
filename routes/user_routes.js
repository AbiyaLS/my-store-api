import express from "express"
import { createUser, getAllUsers } from "../controller/user_controller.js"

const router =express.Router()

// create user
router.post("/",createUser)
// get all users
router.get("/",getAllUsers)

export default router