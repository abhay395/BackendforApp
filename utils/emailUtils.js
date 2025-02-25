import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  secure: true, // Use secure connection
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `Abhay Prajapati <${process.env.EMAIL_USER}>`, // Sender email with angle brackets
    to, // Recipient email
    subject, // Email subject
    text, // Email text content
    html, // Email HTML content (optional)
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    // Optionally, you could throw the error or handle it further
  }
};

export { sendEmail };
