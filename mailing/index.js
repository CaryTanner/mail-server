const nodemailer = require('nodemailer');

require('dotenv').config()
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const hbs = require('nodemailer-express-handlebars');

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;



const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);



const hbsOptions = {
  viewEngine: {
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extName: ".hbs"
  },
  extName: ".hbs",
  viewPath: __dirname + "views"
};



/**
 * Send Email
 */
async function sendEmail(data){
    console.log(data)
    
   try { 
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    
  });  
  
  const accessToken =  await oauth2Client.getAccessToken();
  

  
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
    
  });
  
// smtpTransport.use('compile', hbs(hbsOptions));



const mailOptionsToNewContact = {
    from: `Cary Tanner <${SENDER_EMAIL_ADDRESS}>`,
    to: data.email,
    subject: 'Contact from Cary Tanner- Web Developer',
   
    html: `<h1> Hi ${data.name},</h1>

    <h2> Thanks for getting in touch! </h2>
    
    <h2> This is an auto-reply but, I will get back to you ASAP.</h2>
    
    <h2>All the best,</h2>
    
    <h1>Cary Tanner<h1>
    
    <h3> Web Developer- <a href="https://carytanner.com">carytanner.com</a></h3> 
    `
}

const mailOptionsToCary = {
  from: `Cary Tanner <${SENDER_EMAIL_ADDRESS}>`,
  to: SENDER_EMAIL_ADDRESS,
  subject: 'you have an new contact msg',
  // template: 'contactReply.hbs',
  // context: {
  //   name: data.name
  // }
  html: `<h1> hey Cary</h1>
  <h1> Someone wants to contact you: <h1>
  <ul><li> From: ${data.name} </li> 
  <li> email from: ${data.email} </li> 
  <li> message: ${data.msg} </li>
  </ul>`
}


  const result = await smtpTransport.sendMail(mailOptionsToNewContact) + smtpTransport.sendMail(mailOptionsToCary)

 return result



} catch (error) {
 return error
}
};

export default sendEmail;