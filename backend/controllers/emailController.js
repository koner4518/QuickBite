import transporter from "../config/email.js";

const sendMail = async (email, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER,
            to: email,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);

        return {
            success: true,
            message: "Email sent successfully",
        };

    } catch (error) {
        console.error("Email sending error:", error);
        throw error;
    }
};

export {sendMail};