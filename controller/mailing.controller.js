import express from 'express';
import sendEmail from '../mailing';


  const mailingController = express.Router();

  // post when user contacts 

  mailingController.post('/', (req, res) => {
      try {
          sendEmail(req.query);
          res.status(200).json({message: 'email sent'})
      } catch(err) {
        
        res.status(500).send('Contact email not sent')
      }
  })

  export default mailingController