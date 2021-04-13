"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roversRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Rover = require('../models/rover');
const { response } = require('../app');
roversRouter.get('/', async (request, response) => {
    const rovers = await User.find({});
    response.json(rovers);
});
roversRouter.post('/new-rover', async (request, response) => {
    const body = request.body;
    const rover = new Rover({
        userId: body.userId,
    });
    const savedRover = await rover.save();
    response.json(savedRover);
});
module.exports = roversRouter;
