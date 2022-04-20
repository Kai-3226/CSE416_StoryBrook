const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


const sendEmail = async (email, subject, payload, template) => {
 
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport("SMTP",{
        host: "hotmail",
        // port: 587,
        // secure: false,
        // tls: {
        //   ciphers:'SSLv3'
        //   },
        // requireTLS:true,//this parameter solved problem for me
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
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
        return process.exit(1);
    }

    
        // Preview only available when sending through an Ethereal account
       
    })

};


/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;
