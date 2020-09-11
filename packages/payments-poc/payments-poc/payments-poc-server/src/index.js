const env = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const uuidv4 = require('uuid').v4
const cors = require('cors')
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const app = express()
const { resolve } = require('path')
const { getAccountHandler, createAccountHander } = require('./db')
const port = process.env.PORT || 4242

app.use(cors())

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
)

app.use(express.static(process.env.STATIC_DIR))

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next()
  } else {
    console.log('Parsing request')
    bodyParser.json()(req, res, next)
  }
})

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html')
  res.sendFile(path)
})

app.get('/public-key', (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY })
})

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(req.body)
    res.json(paymentIntent)
  } catch (err) {
    res.json(err)
  }
})

app.post('/onboard-user', async (req, res) => {
  try {
    const account = await stripe.accounts.create({ type: 'express' })
    req.session.accountID = account.id

    const origin = `${req.headers.origin}`
    const accountLinkURL = await generateAccountLink(account.id, origin)
    res.send({ url: accountLinkURL })
  } catch (err) {
    res.status(500).send({
      error: err.message,
    })
  }
})

app.get('/onboard-user/refresh', async (req, res) => {
  if (!req.session.accountID) {
    res.redirect('/')
    return
  }
  try {
    const { accountID } = req.session
    const origin = `${req.secure ? 'https://' : 'https://'}${req.headers.host}`

    const accountLinkURL = await generateAccountLink(accountID, origin)
    res.redirect(accountLinkURL)
  } catch (err) {
    res.status(500).send({
      error: err.message,
    })
  }
})

function generateAccountLink(accountID, origin) {
  return stripe.accountLinks
    .create({
      type: 'account_onboarding',
      account: accountID,
      refresh_url: `${origin}/onboard-user/refresh`,
      return_url: `${origin}/onboard-user/success`,
    })
    .then((link) => link.url)
}

// Webhook handler for asynchronous events.
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    let data
    let eventType
    // Check if webhook signing is configured.
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event
      let signature = req.headers['stripe-signature']

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        )
      } catch (err) {
        console.log(`⚠️ Webhook signature verification failed.`)
        return res.sendStatus(400)
      }
      // Extract the object from the event.
      data = event.data
      eventType = event.type
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data
      eventType = req.body.type
    }

    if (eventType === 'payment_intent.succeeded') {
      // Fulfill any orders, e-mail receipts, etc
      console.log('💰 Payment received!')
    }

    if (eventType === 'payment_intent.payment_failed') {
      // Notify the customer that their order was not fulfilled
      console.log('❌ Payment failed.')
    }

    res.sendStatus(200)
  }
)

app.get('/get-oauth-link', async (req, res) => {
  const state = req.query.customerId
  req.session.state = state

  const args = new URLSearchParams({
    state,
    client_id: process.env.STRIPE_CLIENT_ID,
  })
  const url = `https://connect.stripe.com/express/oauth/authorize?${args.toString()}`
  return res.send({ url })
})

app.get('/get-account-id', async (req, res) => {
  const customerId = req.query.customerId
  const account = await getAccountHandler(customerId)
  res.status(200)
  return res.send({
      account,
  })
})

app.get('/authorize-oauth', async (req, res) => {
  const { code, state } = req.query
  stripe.oauth
    .token({
      grant_type: 'authorization_code',
      code,
    })
    .then(
      async (response) => {
        const connected_account_id = response.stripe_user_id

        await createAccountHander({
          accountId: connected_account_id,
          customerId: state,
        })
        // Render some HTML or redirect to a different page.
        return res.redirect(301, `https://payments.dev.paas.reapit.cloud`)
      },
      (err) => {
        console.log('error', err)
        if (err.type === 'StripeInvalidGrantError') {
          return res
            .status(400)
            .json({ error: 'Invalid authorization code: ' + code })
        } else {
          return res.status(500).json({ error: 'An unknown error occurred.' })
        }
      }
    )
})

app.listen(port, () => console.log(`Node server listening on port ${port}!`))

module.exports = app
