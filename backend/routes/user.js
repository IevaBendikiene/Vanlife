import express from "express";
import { loginUser, signupUser } from "../controllers/userControllers.js";

const router = express.Router();

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

export default router;
