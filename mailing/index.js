import nodemailer from 'nodemailer';
import ejs from 'ejs';
require('dotenv').config()
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const Mailing = {};

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
);

const TEMPLATES = {
  replycontact: {
    fileName: 'replycontact.ejs',
    subject: '[ABC Inc.] Welcome to ABC Inc.',
  },
};

/**
 * Send Email
 */
async function sendEmail(data){
    
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
 
  const filePath = `${__dirname}/templates/${TEMPLATES[data.template].fileName}`;  
 
//   ejs.renderFile(filePath, data, {}, (e, content) => {
//     if (e) return e;
//     console.log(data.email)
//     const mailOptions = {
//       from: SENDER_EMAIL_ADDRESS,
//       to: data.email,
//       subject: TEMPLATES[data.template].subject,
//       html: content,
//     };  
    
//     smtpTransport.sendMail(mailOptions, (err, info) => {
//         console.log(mailOptions)
//       if (err) return err;
//       return info;
//     });
    
//   });
 
const mailOptions = {
    from: `Cary Tanner <${SENDER_EMAIL_ADDRESS}>`,
    to: data.email,
    subject: 'tester email',
    text: "hello from email",
    html: '<h1>hej ainhoa</h1> '
}
 const result =  await smtpTransport.sendMail(mailOptions )
 
 return result


} catch (error) {
 return error
}
};

export default sendEmail;