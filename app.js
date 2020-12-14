// Import all dependencies & middleware here
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config()
const hbs = require("nodemailer-express-handlebars");
const cors = require('cors')

import { userController, mailingController } from './controller';
let PORT = process.env.PORT || 8080
// Init an Express App.
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// controllers here
app.use('/', userController);
app.use('/mailing', mailingController)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
  
});
