"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exhibitionsRouter = require('express').Router();
const Exhibition = require('../models/exhibition');
const { response } = require('../app');
exhibitionsRouter.get('/', async (request, response) => {
    const exhibitions = await Exhibition.find({}).populate('rovers');
    response.json(exhibitions);
});
exhibitionsRouter.post('/new-exhibition', async (request, response) => {
    console.log(request.body);
    let exhibition = new Exhibition({
        artspace: request.body.artspace,
        rovers: request.body.rovers,
        description: request.body.description,
        openingDay: request.body.openingDay,
        closingDay: request.body.closingDay,
        title: request.body.title,
        bannerImage: request.body.bannerImage
    });
    console.log(exhibition);
    const newExhibition = await exhibition.save();
    response.json(newExhibition);
});
module.exports = exhibitionsRouter;
