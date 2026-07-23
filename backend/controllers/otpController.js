import transporter from "../config/email.js";
import generateOTP from "../utils/generateOTP.js"
import OTP from "../models/otpModel.js";
import User from "../models/userModel.js"

const sendOTP = async (req, res) => {
    try {
        const {email} = req.body;

        if(!email){
            return res.json({success: false, message: "Email is required"});
        }

        // Check if user already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.json({success: false, message: "User already exists. Please login instead."});
        }

        // delete previous otp
        await OTP.deleteMany({email});

        // generate new otp
        const otp = generateOTP();
        await OTP.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        });

        // send Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "QuickBite Email Verification",
            html: `<h2>Your Verification Code</h2>
                <h1>${otp}</h1>
                <p>This OTP is valid for 2 minutes.</p>`,
        });

        res.json({success: true, message: "OTP sent successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({success: false, message: "Email and OTP are required"});
        }

        // Find OTP
        const otpData = await OTP.findOne({ email });

        if (!otpData) {
            return res.json({
                success: false,
                message: "OTP not found. Please request a new OTP."
            });
        }

        // Check expiry
        if (otpData.expiresAt < new Date()) {

            await OTP.deleteOne({ email });
            return res.json({success: false, message: "OTP has expired"});
        }

        // Check OTP
        if (otpData.otp !== otp) {
            return res.json({success: false, message: "Invalid OTP"});
        }

        // OTP Verified
        await OTP.deleteOne({ email });

        res.json({success: true, message: "OTP verified successfully"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {sendOTP, verifyOTP};