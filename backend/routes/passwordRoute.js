import express from "express";
import { resetPassword, sendPasswordResetOTP, verifyPasswordResetOTP } from "../controllers/passwordController.js";

const passwordRouter = express.Router();

passwordRouter.post("/forgot", sendPasswordResetOTP);
passwordRouter.post("/verify-otp", verifyPasswordResetOTP);
passwordRouter.post("/reset", resetPassword);

export default passwordRouter;