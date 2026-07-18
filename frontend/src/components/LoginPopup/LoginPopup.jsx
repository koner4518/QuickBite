import { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";
import { loginUser, registerUser, sendOTP, verifyOTP } from "./authService.js";
import OTPInput from "./OTPInput.jsx";

export default function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const { url, setToken } = useContext(StoreContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // login
      if (currState === "Login") {
        const response = await loginUser(url, data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          toast.error(response.data.message);
        }
        return;
      }

      //sign up
      // Step 1: Send OTP
      if (!showOtpInput) {
        const response = await sendOTP(url, data.email);

        if (response.data.success) {
          toast.success("OTP sent to your email.");
          setShowOtpInput(true);
        } else {
          toast.error(response.data.message);
        }
        return;
      }

      //Step 2: verify OTP
      const verifyResponse = await verifyOTP(url, data.email, otp.join(""));

      if (!verifyResponse.data.success) {
        toast.error(verifyResponse.data.message);
        return;
      }

      // register
      const response = await registerUser(url, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const response = await sendOTP(url, data.email);
    setLoading(true);

    try {
      if (response.data.success) {
        toast.success("OTP resent successfully.");

        setCountdown(30);
        setCanResend(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;

    if (showOtpInput && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown == 0) {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [showOtpInput, countdown]);

  return (
    <div className="login-popup">
      <form onSubmit={handleAuth} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Your Name"
              name="name"
              value={data.name}
              disabled={showOtpInput}
              required
            />
          )}
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
            : currState === "Login"
              ? "Login"
              : showOtpInput
                ? "Verify OTP"
                : "Create Account"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}