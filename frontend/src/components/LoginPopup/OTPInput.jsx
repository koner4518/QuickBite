export default function OTPInput({
  otp, email, countdown, canResend,
  handleOtpChange, handleKeyDown, handleResendOTP}) {

  return (
    <div className="otp-container">
      <p className="otp-message">We've sent a 6-digit verification code to</p>
      <span className="otp-email">{email}</span>

      <div className="otp-boxes">
        {otp.map((digit, index) => (
          <input
            key={index}
            className="otp-input"
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            required
          />
        ))}
      </div>

      <div className="otp-resend">
        {canResend ? (
          <button
            type="button"
            className="resend-btn"
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
        ) : (
          <p>Resend OTP in {countdown}s</p>
        )}
      </div>
    </div>
  );
}