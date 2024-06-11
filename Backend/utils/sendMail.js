const nodemailer = require('nodemailer')

const sendMail = ({ email, subject, text }) => {
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
  } catch (e) {
    console.log(e)
  }
}
