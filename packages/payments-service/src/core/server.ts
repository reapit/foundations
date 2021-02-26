import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import memoryStore from 'memorystore'
import uuid from 'uuid/v4'
import cors from 'cors'
import { traceIdMiddleware } from '@reapit/node-utils'
import router from './router'
const MemoryStore = memoryStore(session)

const app = express()

app.use(cors())

app.use(
  session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  }),
)

app.use(traceIdMiddleware)
app.use(bodyParser.json())
app.get('/ok', (_req, res) => {
  res.status(200).send('ok').end()
})
app.use(router)

export default app
