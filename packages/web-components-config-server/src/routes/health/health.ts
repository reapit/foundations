import express from 'express'

const health = express.Router()

health.get('/', (req, res) => {
  return res.json({ message: 'Service is running' })
})

export default health
