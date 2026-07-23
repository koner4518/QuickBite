import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import OTP from '../models/otpModel.js'
import generateOTP from '../utils/generateOTP.js'
import { sendMail } from './emailController.js'

const sendPasswordResetOTP = async (req, res) => {
    try {
        const {email} = req.body;

        if(!email){
            return res.json({success: false, message: "Email is required"});
        }

        const user = User.findOne({email});

        if(!user){
            return res.json({success: false, message: "User not registered with this email"});
        }

        await OTP.deleteMany({email});

        const otp = generateOTP();

        await OTP.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000)
        });

        // Send OTP email
        await sendMail(
            email,
            "QuickBite Password Reset OTP",
            `
                <h2>Password Reset Request</h2>
                <p>Your OTP for resetting your QuickBite password is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 2 minutes.</p>
            `
        );

        return res.json({success: true, message: "Password reset OTP sent successfully"});
    } catch (error) {
        console.log("Password Reset OTP Error:", error);

        return res.json({success: false, message: error.message});
    }
}

const verifyPasswordResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({
                success: false,
                message: "Email and OTP are required"
            });
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

            return res.json({
                success: false,
                message: "OTP has expired"
            });
        }

        // Check OTP
        if (otpData.otp !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Mark OTP as verified
        otpData.verified = true;
        await otpData.save();
        return res.json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.log("Password Reset OTP Verification Error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.json({
                success: false,
                message: "Email and new password are required"
            });
        }

        // Find verified OTP
        const otpData = await OTP.findOne({
            email,
            verified: true
        });

        if (!otpData) {
            return res.json({
                success: false,
                message: "Please verify OTP first"
            });
        }

        // Check expiry
        if (otpData.expiresAt < new Date()) {
            await OTP.deleteOne({ email });

            return res.json({
                success: false,
                message: "OTP verification has expired"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        // Delete OTP after successful password reset
        await OTP.deleteOne({ email });

        return res.json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log("Reset Password Error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

export {sendPasswordResetOTP, verifyPasswordResetOTP, resetPassword};