import express from 'express'
import { hello } from './functions'

const app = express()

app.get('/', hello)

export default app
