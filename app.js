// Import all dependencies & middleware here
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config()

import { userController, mailingController } from './controller';

// Init an Express App.
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use all controllers(APIs) here
app.use('/', userController);
app.use('/mailing', mailingController)

// Start Server here
app.listen(8080, () => {
  console.log('Server is running on port 8080!');
  
  // mongoose.connect('mongodb://localhost/test').then(() => {
  //   console.log('Connected to mongoDB at port 27017');
  // });
});
