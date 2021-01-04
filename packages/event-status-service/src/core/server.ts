import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import uuid from 'uuid/v4'
import cors from 'cors'
import { traceIdMiddleware } from '@reapit/node-utils'
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
app.use(bodyParser.json())
app.use(router)

export default app
