import express from 'express'
import * as bodyParser from 'body-parser'

import router from './router'
import errorStrings from '../constants/error-strings'
import errorHandler from '../utils/error-handler';

const expressApp = express()

expressApp.use(bodyParser.json());
expressApp.use('/api', router)
expressApp.use((err: Error, _req: any, res: express.Response) => {
  // logic
  errorHandler(res, 404, errorStrings.NOT_FOUND)
})

export default expressApp
