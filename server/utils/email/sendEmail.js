const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


const sendEmail = async (email, subject, payload, template) => {

let transporter = nodemailer.createTransport('SMTP', {
    service: "hotmail",
    auth: {
        user: "storybrook888@hotmail.com",
        pass: "story88888888"
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
        console.log(process.env.EMAIL_USERNAME);
        return process.exit(1);
    }
    console.log('Message sent: ' + info.response);
    // Preview only available when sending through an Ethereal account
   
})
};


module.exports = sendEmail;