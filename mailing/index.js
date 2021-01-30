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
  
  console.log(accessToken)

  
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
    attachments: [{
      filename: 'tannerLogo.jpg',
      path: __dirname + '/tannerLogo.jpg',
      cid: 'tannerLogo' //same cid value as in the html img src
  }],
    html: `<p style=" font-size:24px">Hi ${data.name},</p>

    <p style="font-size:24px">Thanks for getting in touch!</p>
    
    <p style="font-size:24px">This is an auto-reply but I will get back to you ASAP.
    
    <p style="font-size:24px">All the best,</p>
  
    <p style="font-size:24px">Cary </p>

    <img src="cid:tannerLogo">

    <p style="font-size: 18px;"> Cary Tanner 
    <br/>
    <span style="font-size: 14px">Web Developer</span>
    <br/>
    <span style="font-size: 14px">Tel. +46 707 27 82 61</span> 
<br/>
    <a style="text-decoration:none;font-size: 14px " href="https://carytanner.com">carytanner.com</a>
    <br/>
    <a style="text-decoration:none;font-size: 14px " href="https://www.linkedin.com/in/carytanner/">LinkedIn</a>
    <br/>
    <a style="text-decoration:none; font-size: 14px" href="https://github.com/CaryTanner">GitHub</a></p>
   
    
    `
}

const mailOptionsToCary = {
  from: `Cary Tanner <${SENDER_EMAIL_ADDRESS}>`,
  to: SENDER_EMAIL_ADDRESS,
  subject: 'you have an new contact msg',
 
  html: `<h1> Hey Cary</h1>
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