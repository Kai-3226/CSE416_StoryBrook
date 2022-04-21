const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


const sendEmail = async (email, subject, payload, template) => {
try{
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
    ciphers:'SSLv3'
    },
    requireTLS:true,//this parameter solved problem for me
    auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_USERNAME
    }});
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
        console.log(process.env.EMAIL_USERNAME);
        return process.exit(1);
    }
  
    // Preview only available when sending through an Ethereal account
   
})}catch(error){ console.log(error)}

};


module.exports = sendEmail;