import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";
import { sendPasswordResetOTP, verifyPasswordResetOTP, resetPassword} from "./authService.js";
import OTPInput from "./OTPInput.jsx";

export default function ForgotPassword({ setShowLogin, onLogin }) {

    const { url } = useContext(StoreContext);

    const [resetStep, setResetStep] = useState("email");
    const [resetEmail, setResetEmail] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(59);
    const [canResend, setCanResend] = useState(false);

    const handleOtpChange = (element, index) => {
        const value = element.value;
        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && element.nextElementSibling) {
            element.nextElementSibling.focus();
        }
    }

    const handleKeyDown = ( e, index ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            e.target.previousElementSibling.focus();
        }
    }

    const handleSendOTP = async () => {
        if (!resetEmail) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        try {
            const response = await sendPasswordResetOTP(url, resetEmail);

            if (response.data.success) {
                toast.success("OTP sent to your email");
                setResetStep("otp");
                setOtp(new Array(6).fill(""));
                setCountdown(59);
                setCanResend(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyOTP = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            toast.error("Please enter the complete OTP");
            return;
        }

        setLoading(true);

        try {
            const response = await verifyPasswordResetOTP(url, resetEmail, enteredOtp);

            if (response.data.success) {
                toast.success("OTP verified successfully");
                setResetStep("password");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {

        if (newPassword.length < 8) {
            toast.error("Password must contain at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPassword(url, resetEmail, newPassword);

            if (response.data.success) {
                toast.success("Password reset successfully");

                // Reset all states
                setResetStep("email");
                setResetEmail("");
                setOtp(new Array(6).fill(""));
                setNewPassword("");
                // Go back to Login
                onLogin();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    const handleResendOTP = async () => {
        setLoading(true);

        try {
            const response = await sendPasswordResetOTP(url, resetEmail);

            if (response.data.success) {
                toast.success("OTP resent successfully");
                setOtp(new Array(6).fill(""));
                setCountdown(59);
                setCanResend(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (resetStep !== "otp" || countdown <= 0) {
            if (countdown <= 0) {
                setCanResend(true);
            }
            return;
        }

        const timer =
            setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

        return () => clearInterval(timer);
    }, [countdown, resetStep]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (resetStep === "email") {
            await handleSendOTP();
        }

        else if (resetStep === "otp") {
            await handleVerifyOTP();
        }

        else if (resetStep === "password") {
            await handleResetPassword();
        }
    };

    return (
        <form
            onSubmit={handleSubmit} className="login-popup-container">
            <div className="login-popup-title">
                <h2>Forgot Password</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close"/>
            </div>

            {resetStep === "email" && (
                <div className="login-popup-inputs">
                    <p>Enter your email address to receive an OTP</p>
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                    />
                </div>
            )}

            {resetStep === "otp" && (
                <div className="login-popup-inputs">
                    <OTPInput
                        otp={otp}
                        email={resetEmail}
                        countdown={countdown}
                        canResend={canResend}
                        handleOtpChange={handleOtpChange}
                        handleKeyDown={handleKeyDown}
                        handleResendOTP={handleResendOTP}
                    />
                </div>
            )}

            {resetStep === "password" && (
                <div className="login-popup-inputs">
                    <p>Enter your new password</p>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
            )}

            <button type="submit" disabled={loading}>
                {loading
                    ? "Please wait..."
                    : resetStep === "email"
                        ? "Send OTP"
                        : resetStep === "otp"
                            ? "Verify OTP"
                            : "Reset Password"
                }
            </button>

            <p>
                Remember your password?{" "}
                <span onClick={onLogin}>Login here</span>
            </p>
        </form>
    );
}