import * as express from 'express'

const expressApp = express()

expressApp.get('/', (_req, res) => res.send('Hello World!'))
expressApp.get('/login', (_req, res) => res.send('Login'))
expressApp.get('/refresh', (_req, res) => res.send('Refresh'))

export default expressApp
