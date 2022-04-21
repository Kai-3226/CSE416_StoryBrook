const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


const sendEmail = async (email, subject, payload, template) => {
try{
   // Create a SMTP transporter object
   let transporter = nodemailer.createTransport({
    host: 'gmail.com',
    port: 3100,
    secure: false, // use SSL
    auth: {
        user: 'story88brook@gmail.com',
        pass: 'story888brook+++'
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