import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import './AuthPopup.css'

export default function AuthPopup({ setShowLogin }) {

    const [authMode, setAuthMode] = useState("login");

    return (
        <div className="login-popup">

            {authMode === "login" && (
                <LoginForm
                    setShowLogin={setShowLogin}
                    onSignup={() => setAuthMode("signup")}
                    onForgotPassword={() => setAuthMode("forgot-password")}
                />
            )}

            {authMode === "signup" && (
                <SignupForm
                    setShowLogin={setShowLogin}
                    onLogin={() => setAuthMode("login")}
                />
            )}

            {authMode === "forgot-password" && (
                <ForgotPassword
                    setShowLogin={setShowLogin}
                    onLogin={() => setAuthMode("login")}
                />
            )}

        </div>
    );
}