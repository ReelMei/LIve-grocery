import express from "express";
import { logn, register } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', logn)

export default authRouter