import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import router from './router'

const expressApp = express()

expressApp.use(bodyParser.json());
expressApp.use(awsServerlessExpressMiddleware.eventContext())
expressApp.use('/api', router)

export default expressApp
