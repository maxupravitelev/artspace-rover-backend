"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roversRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Rover = require('../models/rover');
const User = require('../models/user');
const { response } = require('../app');
const getTokenFrom_1 = require("../utils/getTokenFrom");
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
roversRouter.put('/updateJitsiUrl/:id', async (request, response) => {
    const token = getTokenFrom_1.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    const updatedJitsiUrl = {
        jitsiUrl: body.jitsiUrl,
    };
    const updatedRover = await Rover.findByIdAndUpdate(request.params.id, updatedJitsiUrl, { new: true });
    response.json(updatedRover);
});
roversRouter.put('/updateRoverUrl/:id', async (request, response) => {
    const token = getTokenFrom_1.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    const updatedRoverUrl = {
        roverUrl: body.roverUrl,
    };
    const updatedRover = await Rover.findByIdAndUpdate(request.params.id, updatedRoverUrl, { new: true });
    response.json(updatedRover);
});
roversRouter.put('/updateMjpgUrl/:id', async (request, response) => {
    const token = getTokenFrom_1.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    const updatedMjpgUrl = {
        mjpgUrl: body.mjpgUrl,
    };
    const updatedRover = await Rover.findByIdAndUpdate(request.params.id, updatedMjpgUrl, { new: true });
    response.json(updatedRover);
});
roversRouter.put('/updateStreamingMode/:id', async (request, response) => {
    const token = getTokenFrom_1.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    const updatedStreamingMode = {
        streamingMode: body.streamingMode,
    };
    const updatedRover = await Rover.findByIdAndUpdate(request.params.id, updatedStreamingMode, { new: true });
    response.json(updatedRover);
});
module.exports = roversRouter;
