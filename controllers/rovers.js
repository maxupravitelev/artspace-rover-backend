"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roversRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Rover = require('../models/rover');
const User = require('../models/user');
const { response } = require('../app');
roversRouter.get('/', async (request, response) => {
    const rovers = await User.find({});
    response.json(rovers);
});
roversRouter.post('/new-rover', async (request, response) => {
    const body = request.body;
    const user = await User.findById(body.user);
    const rover = new Rover({
        user: body.user,
    });
    const savedRover = await rover.save();
    user.rovers = user.rovers.concat(savedRover._id);
    await user.save();
    response.json(savedRover);
});
module.exports = roversRouter;
