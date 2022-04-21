const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


const sendEmail = async (email, subject, payload, template) => {

  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
    ciphers:'SSLv3'
    },
    auth: {
    user: 'harryhualin@outlook.com',
    pass: 'Aa83907934+'
    }
  });
////Message object
const source = fs.readFileSync(path.join(__dirname, template), "utf8");
const compiledTemplate = handlebars.compile(source);
const options = () => {
  return {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: subject,
    html: compiledTemplate(payload),
  };
};
console.log("sending email");
transporter.sendMail(options(), (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        console.log(process.env.EMAIL_USERNAME2);
        return process.exit(1);
    }
    console.log('Message sent: ' + info.response);
    // Preview only available when sending through an Ethereal account
   
})
};


module.exports = sendEmail;