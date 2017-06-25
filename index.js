'use strict';

const http        = require('http');
const express     = require('express');
const mongoose    = require('mongoose');
const queryRouter = require('./router/queryRouter');
const path        = require('path');
const dotenv      = require('dotenv');

dotenv.load();

const app = express();

mongoose.connect('mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds032340.mlab.com:32340/scrapme');

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'www')));

app.use('/Search', queryRouter);

server.listen(3000, err => console.log(err || "You server is listening on 3000"));