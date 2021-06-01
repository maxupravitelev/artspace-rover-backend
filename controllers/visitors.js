"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visitorsRouter = require('express').Router();
const Visitor = require('../models/visitor');
const Timeslot = require('../models/timeslot');
const { response } = require('../app');
const randomWords = require('random-words');
let sessionState = "session ended";
let instantSessionState = "session ended";
visitorsRouter.get('/findbyid/:id', async (request, response) => {
    const visitor = await Visitor.findById(request.params.id).populate('timeslot');
    response.json(visitor);
});
visitorsRouter.get('/checkSession/', async (request, response) => {
    response.json(sessionState);
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
    const visitor = await Visitor.findOne({ eMailAddress: request.body.eMailAddress }).populate('timeslot');
    if (!visitor) {
        return response.status(400).json({
            error: 'visitor not found',
        });
    }
    if (visitor.passphrase != request.body.passphrase) {
        return response.status(401).json({
            error: 'invalid password',
        });
    }
    const timeNow = Date.now();
    const timeslotStartingTime = Date.parse("2021-04-22T" + visitor.timeslot.startTime + ":00");
    const timeslotEndingTime = Date.parse("2021-04-22T" + visitor.timeslot.endTime + ":00");
    sessionState = "session started";
    console.log("driving session started");
    response.json('session can be started');
});
visitorsRouter.post('/endSession', async (request, response) => {
    const visitor = await Visitor.findOne({ passphrase: request.body.passphrase });
    if (!visitor) {
        return response.status(400).json({
            error: 'visitor not found',
        });
    }
    if (visitor.passphrase != request.body.passphrase) {
        return response.status(401).json({
            error: 'invalid password',
        });
    }
    sessionState = "session ended";
    console.log("driving session ended");
    response.json(sessionState);
});
visitorsRouter.post('/setInstantSessionState', async (request, response) => {
    instantSessionState = request.body.state;
    response.json(sessionState);
});
module.exports = visitorsRouter;
