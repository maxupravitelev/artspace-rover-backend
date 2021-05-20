// const logger = require('./logger')

import { info, log_error } from './logger'

const requestLogger = (request: Request, response: Response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request: Request, response: Response, next) => {
  log_error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}