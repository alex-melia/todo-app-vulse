import express from "express"
import { logIn, signUp } from "../controllers/authController"

const router = express.Router()

router.post("/login", logIn)
router.post("/signup", signUp)

export { router as authRoutes }
