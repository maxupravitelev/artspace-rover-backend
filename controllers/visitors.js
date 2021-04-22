"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visitorsRouter = require('express').Router();
const Visitor = require('../models/visitor');
const Timeslot = require('../models/timeslot');
const { response } = require('../app');
const randomWords = require('random-words');
visitorsRouter.get('/:id', async (request, response) => {
    const visitor = await Visitor.findById(request.params.id).populate('timeslot');
    response.json(visitor);
});
visitorsRouter.post('/new-visitor/timeslot/:id', async (request, response) => {
    let passphrase = randomWords({ exactly: 5, join: ' ' });
    const timeslotInDb = await Timeslot.findById(request.params.id);
    let visitor = new Visitor({
        eMailAddress: request.body.eMailAddress,
        passphrase: passphrase,
        timeslot: timeslotInDb._id
    });
    timeslotInDb.available = false;
    timeslotInDb.save();
    const newVisitor = await visitor.save();
    const newVisitorInDb = await Visitor.findById(newVisitor._id).populate('timeslot');
    response.json(newVisitorInDb);
});
visitorsRouter.post('/check/', async (request, response) => {
    const visitor = await Visitor.findOne({ eMailAddress: request.body.credentials.eMailAddress }).populate('timeslot');
    console.log(request.body);
    if (!visitor) {
        return response.status(400).json({
            error: 'visitor not found',
        });
    }
    if (visitor.passphrase != request.body.credentials.passphrase) {
        return response.status(401).json({
            error: 'invalid password',
        });
    }
    const timeNow = Date.now();
    const timeslotStartingTime = Date.parse("2021-04-22T" + visitor.timeslot.startTime + ":00");
    const timeslotEndingTime = Date.parse("2021-04-22T" + visitor.timeslot.endTime + ":00");
    if (timeNow < timeslotStartingTime) {
        return response.status(400).json({
            error: `your session has not started yet, please come back on ${visitor.timeslot.startTime} (${visitor.timeslot.date})`,
        });
    }
    if (timeNow > timeslotEndingTime) {
        return response.status(400).json({
            error: `your session has already ended, it was booked on ${visitor.timeslot.endTime} (${visitor.timeslot.date})`,
        });
    }
    response.json(visitor);
});
module.exports = visitorsRouter;
