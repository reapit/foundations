import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import uuid from 'uuid'
import cors from 'cors'
import { morganLogging, traceIdMiddleware } from './logger'
import router from './router'

const app = express()

app.use(cors())

app.use(
  session({
    secret: uuid.v4(),
    resave: false,
    saveUninitialized: true,
  })
)

app.use(traceIdMiddleware)
app.use(morganLogging)
app.use(bodyParser.json())
app.use(router)

export default app
