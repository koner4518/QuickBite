import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";

import {registerUser, sendOTP, verifyOTP} from "./authService.js";
import OTPInput from "./OTPInput.jsx";

export default function SignupForm({setShowLogin, onLogin}) {

    const { url, setToken } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const [showOtpInput, setShowOtpInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(59);
    const [canResend, setCanResend] = useState(false);

    const handleInputChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSendOTP = async () => {
        setLoading(true);

        try {
            const response = await sendOTP(url, data.email);

            if (response.data.success) {
                toast.success("OTP sent to your email");
                setShowOtpInput(true);
                setOtp(new Array(6).fill(""));
                setCountdown(59);
                setCanResend(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
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
            const response = await verifyOTP(url, data.email, enteredOtp);

            if (response.data.success) {
                toast.success("OTP verified successfully");

                // Register user after OTP verification
                const registerResponse = await registerUser(url, data);

                if (registerResponse.data.success) {
                    toast.success("Account created successfully");

                    // Save JWT
                    setToken(registerResponse.data.token);
                    localStorage.setItem("token", registerResponse.data.token);

                    // Close popup
                    setShowLogin(false);
                } else {
                    toast.error(registerResponse.data.message);
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!showOtpInput) {
            await handleSendOTP();
        }

        else {
            await handleVerifyOTP();
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = element.value.slice(-1);
        setOtp(newOtp);

        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            e.target.previousSibling.focus();
        }
    }

    const handleResendOTP = async () => {
        setLoading(true);
        try {
            const response = await sendOTP(url, data.email);

            if (response.data.success) {
                toast.success("OTP resent successfully");

                setOtp(new Array(6).fill(""));
                setCountdown(59);
                setCanResend(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!showOtpInput || countdown <= 0) {
            if (countdown <= 0) {
                setCanResend(true);
            }
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [countdown, showOtpInput]);

    return (
        <form
            onSubmit={handleSubmit} className="login-popup-container">
            <div className="login-popup-title">
                <h2>Sign Up</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close"/>
            </div>

            <div className="login-popup-inputs">
                <input
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={data.name}
                    disabled={showOtpInput}
                    required
                />

                <input
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={data.email}
                    disabled={showOtpInput}
                    required
                />

                <input
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    disabled={showOtpInput}
                    required
                />

                {showOtpInput && (
                    <OTPInput
                        otp={otp}
                        email={data.email}
                        countdown={countdown}
                        canResend={canResend}
                        handleOtpChange={handleOtpChange}
                        handleKeyDown={handleKeyDown}
                        handleResendOTP={handleResendOTP}
                    />
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading
                    ? "Please wait..."
                    : showOtpInput
                        ? "Verify OTP"
                        : "Send OTP"
                }
            </button>

            {!showOtpInput && (
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            )}

            <p>
                Already have an account?{" "}
                <span onClick={onLogin}>
                    Login here
                </span>
            </p>
        </form>
    )
}