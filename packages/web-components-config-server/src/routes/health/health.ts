import express from 'express'

const health = express.Router()

export const healthGetHandler = (req, res) => {
  return res.send({ message: 'Service is running' })
}

health.get('/', healthGetHandler)

export default health
