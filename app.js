// Import all dependencies & middleware here
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const hbs = require("nodemailer-express-handlebars");

import { userController, mailingController } from './controller';

// Init an Express App.
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// controllers here
app.use('/', userController);
app.use('/mailing', mailingController)


app.listen(8080, () => {
  console.log('Server is running on port 8080!');
  
});
