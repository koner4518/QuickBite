import express from 'express'
import { sendTestEmail } from '../controllers/emailController.js'

const emailRouter = express.Router();

emailRouter.get("/test", sendTestEmail);

export default emailRouter;