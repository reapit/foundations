import express, { RequestHandler } from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import memoryStore from 'memorystore'
import { v4 as uuid } from 'uuid'
import cors from 'cors'
import { traceIdMiddleware } from '@reapit/utils-node'
import router from './router'
const MemoryStore = memoryStore(session as any)

const app = express()

app.disable('x-powered-by')
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
app.use(bodyParser.json() as RequestHandler)
app.get('/ok', (_req, res) => {
  res.status(200).send('ok').end()
})
app.use(router)

export default app
