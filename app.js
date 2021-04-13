"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const usersRouter = require('./controllers/users');
const timeslotsRouter = require('./controllers/timeslots');
const exhibitionsRouter = require('./controllers/exhibitions');
const loginRouter = require('./controllers/login');
const roversRouter = require('./controllers/rovers');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
logger_1.info('connecting to', config_1.MONGODB_URI);
mongoose
    .connect(config_1.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    logger_1.info('connected to MongoDB');
})
    .catch((err) => {
    logger_1.log_error('error connection to MongoDB:', err.message);
});
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/timeslots', timeslotsRouter);
app.use('/api/exhibitions', exhibitionsRouter);
app.use('/api/login', loginRouter);
app.use('/api/rovers', roversRouter);
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
