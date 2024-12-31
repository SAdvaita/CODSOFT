const generateEmailTemplate = (subject, body) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              max-width: 600px;
              margin: auto;
            }
            .header {
              font-size: 20px;
              font-weight: bold;
              color: #333;
              text-align: center;
            }
            .body {
              margin-top: 20px;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #999;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">${subject}</div>
            <div class="body">${body}</div>
            <div class="footer">Thank you for using our job portal!</div>
          </div>
        </body>
      </html>
    `;
  };
  
  module.exports = generateEmailTemplate;
  
const generateEmailTemplate = require("./utils/emailTemplate");

const emailBody = generateEmailTemplate(
  "Job Application Successful",
  "Thank you for applying for the position. We will get back to you soon!"
);

sendEmail(user.email, "Application Status", emailBody);
