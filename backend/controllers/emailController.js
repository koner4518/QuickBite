import transporter from "../config/email.js";

const sendTestEmail = async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // send to yourself for testing
            subject: "QuickBite Test Email",
            text: "Congratulations! Nodemailer is working successfully.",
        });

        res.json({
            success: true,
            message: "Email sent successfully",
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

export { sendTestEmail };