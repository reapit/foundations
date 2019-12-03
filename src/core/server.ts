import express, { Response, Request, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import errorStrings from '../constants/error-strings'
import errorHandler from '../utils/error-handler'
import router from './router'

const expressApp = express()

expressApp.use(cors())
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json())
expressApp.use('/api', router)
expressApp.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  errorHandler(res, 404, `${errorStrings.NOT_FOUND} ${err.message}`)
})

export default expressApp
