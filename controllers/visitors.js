"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visitorsRouter = require('express').Router();
const Visitor = require('../models/visitor');
const Timeslot = require('../models/timeslot');
const { response } = require('../app');
const randomWords = require('random-words');
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
module.exports = visitorsRouter;
