import express from 'express'
import { sendOTP, verifyOTP } from '../controllers/otpController.js'

const otpRouter = express.Router();

otpRouter.post("/send", sendOTP);
otpRouter.post("/verify", verifyOTP);
export default otpRouter;