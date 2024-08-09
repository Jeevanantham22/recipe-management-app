'use strict';

require('dotenv').config();
require('./apolloServer');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


require('./app/db');

const port = process.env.BACKEND_PORT;
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Recipe application',
    status: true,
  });
});

app.listen(port,()=>{
  console.log(`Server Listening On Port ${port}`);
});


