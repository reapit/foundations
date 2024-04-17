# Connect Session Server

## Install

```bash
$ yarn add @reapit/connect-session-server
```

## Usage

For server side usage, we also export a Node module with a stripped down API that simply returns a promise from a connectAccessToken method. For a basic and slightly contrived example, see the simple Express app below:

```ts
import express, { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ReapitConnectServerSession, ReapitConnectServerSessionInitializers } from '@reapit/connect-session-server'
import config from './config.json'

const router = Router()

const { connectClientId, connectClientSecret, connectOAuthUrl } = config as ReapitConnectServerSessionInitializers

// Instance as a singleton as token will be cached within the class (prevents duplicate requests for access token)
const reapitConnectSession = new ReapitConnectServerSession({
  connectClientId,
  connectClientSecret,
  connectOAuthUrl,
})

router.get('/get-access-token', async (req: Request, res: Response) => {
  const accessToken = await reapitConnectSession.connectAccessToken()
  // Do some stuff with my access token here, will just return it to the user as an example
  res.status(200)
  res.send(accessToken)
  res.end()
})

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

app.listen('3000', () => {
  console.log('App is listening on 3000')
})
```

As per the browser usage, you will need to instantiate the class with your initializers, in this case `connectClientId`, `connectOAuthUrl` (in the same way as the browser module), but with the addition of the `connectClientSecret` you obtain from your app listing page.

The module will fetch and refresh your session as the token expires, caching it locally to minimise calls to Reapit Connect token endpoint.
