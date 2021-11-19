const routes = require('../app/routes/index');
const morgan = require('morgan');

const express = require('express');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes.userRoute, routes.inventoryRoute, routes.cartRoute);
app.use('/', routes.statusRoute);

module.exports = app;
