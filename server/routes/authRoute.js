import express from "express"
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login) 
router.post("/google")

export default router;