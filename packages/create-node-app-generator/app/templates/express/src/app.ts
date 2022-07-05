import express from 'express'
import { hello } from './functions'

const app = express()
app.disable('x-powered-by')

app.get('/', hello)

export default app
