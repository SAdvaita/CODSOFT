const nodemailer = require("nodemailer");

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail or other email providers
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Job Board" <your-email@gmail.com>', // Sender address
    to, // Receiver's email
    subject, // Subject line
    text, // Plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
