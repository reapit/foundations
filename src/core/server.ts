import express from 'express'
import * as bodyParser from 'body-parser'
import router from './router'

const expressApp = express()

expressApp.use(bodyParser.json())
expressApp.use('/api', router)

export default expressApp
