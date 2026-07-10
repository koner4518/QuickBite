import mongoose from "mongoose";

export const connectDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("connected to DB"))
        .catch(err => console.log(err));
}