if(process.env.NODE_ENV != 'production'){
    require('dotenv').config;
}
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "jose.212002lizardo@gmail.com",
        pass: process.env.PASS_GMAIL
    }
});
transporter.verify(()=>{
    console.log("ready for send emails");
})
module.exports = transporter;