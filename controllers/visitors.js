"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visitorsRouter = require('express').Router();
const Visitor = require('../models/visitor');
const Timeslot = require('../models/timeslot');
const { response } = require('../app');
visitorsRouter.post('/new-visitor/timeslot/:id', async (request, response) => {
    console.log(request.body);
    let passphrase = "test phrase";
    const timeslotInDb = await Timeslot.findById(request.params.id);
    let visitor = new Visitor({
        eMailAddress: request.body.eMailAddress,
        passphrase: passphrase,
        timeslot: timeslotInDb._id
    });
    timeslotInDb.available = false;
    timeslotInDb.save();
    const newVisitor = await visitor.save();
    response.json(newVisitor);
});
module.exports = visitorsRouter;
