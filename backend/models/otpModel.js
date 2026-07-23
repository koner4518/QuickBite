import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;