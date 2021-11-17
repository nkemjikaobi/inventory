const userRoutes = require('./route/user');
const morgan = require('morgan');

const express = require('express');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', userRoutes);

module.exports = app;
