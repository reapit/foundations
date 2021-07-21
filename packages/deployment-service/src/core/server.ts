import express, { json, urlencoded } from 'express'
import session from 'express-session'
import memoryStore from 'memorystore'
import { v4 as uuid } from 'uuid'
import cors from 'cors'
import router from './routes'
const MemoryStore = memoryStore(session as any)

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

app.use(urlencoded() as any)
app.use(json() as any)
app.get('/ok', (_req, res) => {
  res.status(200).send('ok').end()
})
app.use(router)

export default app
