const express = require ('express');
import sendEmail from '../mailing';


  const mailingController = express.Router();

  // post when user contacts 

  mailingController.post('/', (req, res) => {
      try {
          sendEmail(req.body);
         
          res.status(200).json({message: 'Email sent'})
      } catch(err) {
        
        res.status(500).json({message: 'Email NOT sent'})
      }
  })

  export default mailingController