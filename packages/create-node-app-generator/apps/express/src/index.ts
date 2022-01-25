import express from 'express'
import * as config from '../config.json'
import { hello } from './functions'

const app = express()

app.get('/', hello)

app.listen(config.port)
