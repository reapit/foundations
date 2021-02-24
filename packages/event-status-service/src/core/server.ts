import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { traceIdMiddleware } from '@reapit/node-utils'
import router from './router'
import decodeToken from '../middlewares/decode-token'

const app = express()

app.use(cors())
app.get('/ok', (_req, res) => {
  res
    .status(200)
    .send('ok')
    .end()
})
app.use(decodeToken)
app.use(traceIdMiddleware)
app.use(bodyParser.json())
app.use(router)

export default app
