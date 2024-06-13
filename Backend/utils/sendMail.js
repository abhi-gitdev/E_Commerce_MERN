const nodemailer = require('nodemailer')

const sendMail = async ({ email, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASS,
      },
    })
    const mailOptions = {
      from: process.env.HOST_EMAIL,
      to: email,
      subject: subject,
      text: text,
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendMail
