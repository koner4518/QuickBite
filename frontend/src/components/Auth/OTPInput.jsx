import "./OTPInput.css";

export default function OTPInput({
    otp,
    email,
    countdown,
    canResend,
    handleOtpChange,
    handleKeyDown,
    handleResendOTP,
}) {

    return (
        <div className="otp-container">

            <p>
                Enter the 6-digit OTP sent to:
            </p>

            <strong>
                {email}
            </strong>


            {/* OTP Boxes */}

            <div className="otp-inputs">

                {otp.map((value, index) => (

                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={value}
                        onChange={(e) =>
                            handleOtpChange(
                                e.target,
                                index
                            )
                        }
                        onKeyDown={(e) =>
                            handleKeyDown(
                                e,
                                index
                            )
                        }
                    />

                ))}

            </div>


            {/* Countdown / Resend */}

            <div className="otp-resend">

                {canResend ? (

                    <button
                        type="button"
                        onClick={handleResendOTP}
                    >
                        Resend OTP
                    </button>

                ) : (

                    <p>
                        Resend OTP in{" "}
                        <strong>
                            {countdown}s
                        </strong>
                    </p>

                )}

            </div>

        </div>
    );
}