import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import uuid from 'uuid/v4'
import cors from 'cors'
import { createLogger, traceIdMiddleware } from '@reapit/utils'
import router from './router'

const app = express()

app.use(cors())

app.use(
  session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
  }),
)

app.use(traceIdMiddleware)
app.use(createLogger)
app.use(bodyParser.json())
app.use(router)

export default app
