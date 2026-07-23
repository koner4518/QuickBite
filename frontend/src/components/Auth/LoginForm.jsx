import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext.jsx";
import { toast } from "react-toastify";
import { loginUser } from "./authService.js";

export default function LoginForm({setShowLogin, onSignup, onForgotPassword}) {

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const { url, setToken } = useContext(StoreContext);

    const handleInputChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    // Handle Login
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await loginUser(url, data);

            if (response.data.success) {
                // Save token in Context
                setToken(response.data.token);

                // Save token in localStorage
                localStorage.setItem("token", response.data.token);

                // Close authentication popup
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleLogin} className="login-popup-container" >
            <div className="login-popup-title">
                <h2>Login</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close"/>
            </div>

            <div className="login-popup-inputs">
                <input
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={data.email}
                    required
                />

                <input
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Login"}
            </button>

            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p> By continuing, I agree to the terms of use & privacy policy.</p>
            </div>

            <p className="forgot-password">
                Forgot Password?{" "}
                <span onClick={onForgotPassword}> Reset Password </span>
            </p>

            <p>
                Create a new account?{" "}
                <span onClick={onSignup}> Click here </span>
            </p>
        </form>
    )
}