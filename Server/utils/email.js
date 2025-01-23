const nodemailer = require('nodemailer');
const env = require('dotenv')
env.config({path:'./config.env'})


const sendEmail = async (option) =>{
    // CREATE A TRANSPORTER (it actually sends the email) not the nodeJS
    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth:{
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // })




    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

    // DEFINE EMAIL OPTIONS

    const emailOptions = {
        from: 'OncoCura Support <support@OncoCura.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(emailOptions)
}


module.exports = sendEmail;