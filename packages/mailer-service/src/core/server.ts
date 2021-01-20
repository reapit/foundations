import express from 'express'
import bodyParser from 'body-parser'
import { sendEmail } from './ses-client'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/payments/request/:id', async function(_, res) {
  sendEmail('longtr268@gmail.com', 'Hey! Welcome', 'This is the body of email')
  res.send('Email is sent!')
})

export default app
