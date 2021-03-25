"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeslotsRouter = require('express').Router();
const Timeslot = require('../models/timeslot');
const { response } = require('../app');
timeslotsRouter.get('/', async (request, response) => {
    const timeslots = await Timeslot.find({});
    response.json(timeslots);
});
timeslotsRouter.post('/new-timeslot', async (request, response) => {
    console.log(request.body);
    let timeslot = new Timeslot({
        username: request.body.username,
        password: request.body.password
    });
    const newTimeslot = await timeslot.save();
    response.json(newTimeslot);
});
module.exports = timeslotsRouter;
