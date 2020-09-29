import StripeSDK from 'stripe'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import { v4 } from 'uuid'
import cors from 'cors'
const app = express()
import { getAccountHandler, createAccountHander } from './dynamo-db'
const stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY, {} as any)
app.use(cors())

app.use(
  session({
    secret: v4(),
    resave: false,
    saveUninitialized: true,
  })
)

app.use((req, res, next) => {
  bodyParser.json()(req, res, next)
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

app.get('/get-oauth-link', async (req, res) => {
  const state = req.query.customerId
  req.session.state = state

  const args = new URLSearchParams({
    state: state as string,
    client_id: process.env.STRIPE_CLIENT_ID,
  })
  const url = `https://connect.stripe.com/express/oauth/authorize?${args.toString()}`
  return res.send({ url })
})

app.get('/get-account-id', async (req, res) => {
  const customerId = req.query.customerId as string | undefined
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
      code: code as string,
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

// app.listen(port, () => console.log(`Node server listening on port ${port}!`))

export default app
