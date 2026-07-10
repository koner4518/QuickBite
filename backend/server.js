import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import authMiddleware from "./middleware/auth.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/order", orderRouter);

app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:");
    console.error(err);
    console.error(err.message);
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message,
    });
});

app.listen(8080, ()=> {
    console.log("app is listening to port 8080");
});