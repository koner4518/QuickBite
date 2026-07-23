import express from 'express'
import { sendMail } from '../controllers/emailController.js'

const emailRouter = express.Router();

emailRouter.get("/test", sendMail);

export default emailRouter;