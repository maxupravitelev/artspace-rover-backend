const exhibitionsRouter = require('express').Router()

const Exhibition = require('../models/exhibition')
const { response } = require('../app')

import { Request, Response } from 'express'

import { ExhibitionType } from '../types'

///***** .get routes */

/* .get all scores */
exhibitionsRouter.get('/', async (request: Request, response: Response) => {
  const exhibitions = await Exhibition.find({}).populate('rovers')
  response.json(exhibitions)
})



///***** .post routes */

exhibitionsRouter.post('/new-exhibition', async (request: Request, response: Response) => {

  console.log(request.body)

  const exhibitionInRequest: ExhibitionType = {
    artspace: request.body.artspace,
    rovers: request.body.rovers,
    description: request.body.description,
    openingDay: request.body.openingDay,
    closingDay: request.body.closingDay,
    title: request.body.title,
    bannerImage: request.body.bannerImage
  }

  let exhibition = new Exhibition(exhibitionInRequest)

  console.log(exhibition)

  const newExhibition = await exhibition.save()
  response.json(newExhibition)

})


module.exports = exhibitionsRouter