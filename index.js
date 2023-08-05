const express = require('express');
require('dotenv').config(); 
const bodyparser = require('body-parser');
const app = express();

const Router = require('./router/routes');

const mongoose = require('mongoose');


app.use(express.json());

app.use(bodyparser.json());
app.use('/routes',Router);



mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('Not Connected:', err.message);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT);