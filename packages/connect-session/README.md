# Connect Session

![lines](/packages/connect-session/src/tests/badges/badge-lines.svg) ![functions](/packages/connect-session/src/tests/badges/badge-functions.svg) ![branches](/packages/connect-session/src/tests/badges/badge-branches.svg) ![statements](/packages/connect-session/src/tests/badges/badge-statements.svg)

A thin wrapper around the Reapit Connect OAuth API.

Managing OAuth flows can be tricky, especially redirecting, keeping sessions refreshed and cached in memory. To make this process easier, we have built the Connect Session module for any JavaScript app.

To get started run `yarn add @reapit/connect-session`

Then follow the steps for either browsers, React or NodeJS below. For full documentaion [here](https://foundations-documentation.reapit.cloud/app-development/connect-session).

## Basic Browser Usage

The module is intended to be browser framework agnostic although we ship a React Hook for React users (see below).

For all users, in a file at the root of the source of your project, first instantiate and export the `ReapitConnectBrowserSession` class.

The constructor accepts 4 parameters, of which two are optional, see comments below:

```ts
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

// You should instantiate the class once only as a singleton as the module manages it's own state
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  // The client id of your application, obtained from Reapit Developer Portal
  connectClientId: 'SOME_CLIENT_ID',
  // The url to the Reapit Connect instance.
  connectOAuthUrl: 'https://connect.reapit.cloud',
  // OAuth UserPoolId - refer to the foundations documentation to obtain this for the correct environment
  connectUserPoolId: 'SOME_USER_POOL_ID',
  // The relative path you want to re-direct in your application after a successful login. You will have supplied this when you registered your app.
  // Defaults to '' or the root of your project if not supplied
  connectLoginRedirectPath: '/some-redirect-path',
  // The relative path you want to re-direct in your application after a successful logout. You will have supplied this when you registered your app.
  // Defaults to '/login' if not supplied
  connectLogoutRedirectPath: '/some-login-path',
})
```

The instantiated class can then be used in your code. It exports the following methods:

```ts

import { reapitConnectBrowserSession } from './path-to-your-module'

// The definition of the reapitConnectBrowserSession
interface ReapitConnectSession {
  // The accessToken is the `Bearer <<token>>` you need to authenticate against the platform API.
  accessToken: string
  // Refresh token is provided as a convenience - in practice the module handle's refreshing and caching of your session out the box
  refreshToken: string
  // Id token is provided as a convenience - the parsed output is below in the loginIdentity object below
  idToken: string
  // The identity token has been verified as valid before decoding so that you can trust it's claims
  loginIdentity: {
    email: string
    name: string
    developerId: string | null
    clientId: string | null
    adminId: string | null
    userCode: string | null
    groups: string[]
    orgName: string | null
    orgId: string | null
    offGroupIds: string | null
    offGrouping: boolean
    offGroupName: string | null
    officeId: string | null
  }
}

// Returns a promise containing your reapitSession object as per the interface above
reapitConnectBrowserSession.connectSession().then((reapitSession: ReapitConnectSession) => reapitSession)

// Handles redirect to authorization endpoint - in most cases, I don't need to call in my app as handled by the module
// but made public in case I want to override the redirect URI I specified in the constructor
reapitConnectBrowserSession.connectAuthorizeRedirect(redirectUri: string)

// Handles redirect to logout - defaults to constructor login uri but I can override if I like.
reapitConnectBrowserSession.connectLogoutRedirect(redirectUri: string)

// Handles redirect to login - defaults to constructor redirect uri but I can override if I like.
reapitConnectBrowserSession.connectLoginRedirect(redirectUri: string)

// String representation of the original path and query (eg '/some-path?someQuery=true'), of the page I was on before I
// started the OAuth flow. We cache this in the state object before redirecting to the authorize endpoint as a convenience
// so that I can preserve the state of my app on page refresh. Defaults to null if no state param exists in my current URI.
// You may not find this behavior desireable so the module does not perform the redirect by default, however if you do
// you will need to use this value in your code appropriate to your front end stack eg using a redirect component in React Router
reapitConnectBrowserSession.connectInternalRedirect

// A convenience getter to check if my app has been loaded inside RPS / Desktop / Agency Cloud
reapitConnectBrowserSession.connectIsDesktop

// A convenience getter to check if my app has a valid session
reapitConnectBrowserSession.connectHasSession

```

## React Usage

In addition to the basic browser API, we export a React Hook to use in your React Components.

To leverage the Hook, first instantiate the class as per above. Then, around the Routes you wish to protect with Reapit Connect authentication, simply return when the session is not present as below:

```ts
// import the instantiated class, the hook and the provider
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

export const PrivateRouteWrapper: React.FC = ({ children }) => {
  // Call the hook to retun a session object
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  // The session object implements the same interface as the browser class with the exception that the connectSession promise is handled wrapped in a useEffect hook and so is just an objecy or null. Here I return null from the component while I am fetching a session
  if (!connectSession) {
    return null
  }

  // I now have a session I can render my App
  return (
    <AppNavContainer>
      <Menu />
    </AppNavContainer>
  )
}
```

Then in my React child components, I have access to the session values and methods eg:

```ts
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

export const SomeComponent: React.FC = () => {
  const { connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const handleLogout = () => connectLogoutRedirect('/custom-login-path') // Optional path param

  return (
    <CustomFetchComponent connectSession={connectSession}>
      <Button onClick={handleLogout}>I am a logout button!</Button>
    </CustomFetchComponent>
  )
}
```

## Sign In With Reapit Button

Perhaps the simplest way to authenticate on the client side is to embed the "Sign In With Reapit Button" on your page. This is a single script served from our CDN, you instantiate with a target div, your client credentials as per the browser API and pass in a callback to receive your session object. As per the NPM module, all caching, redirection and refreshing is taken care of by the package. When you have a session, the button will change function to be a logout which will clear your cache and end your session in Reapit Connect.

The below example shows how to embed on any static or dynamic page with a single script. In the connectHasSessionCallback function we fetch a list of appointments from the Platform API to demonstrate the full flow.

```html
<div id="reapit-connect-component"></div>
<script src="https://web-components.prod.paas.reapit.cloud/reapit-connect-component.js"></script>
<script>

  const connectHasSessionCallback = (reapitConnectBrowserSession) => {
    reapitConnectBrowserSession.connectSession().then(session => {
      console.log('Session is', session)
      fetch('https://platform.reapit.cloud/appointments', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
          'api-version': '2020-01-31'
        }
      })
      .then(res => res.json())
      .then(appointments => console.log('Appointmemts are', appointments))
    })
  }

  ReapitConnectComponent && new ReapitConnectComponent({
    connectClientId: '<<clientId here>>>',
    connectUserPoolId: '<<user pool id here>>>',
    connectOAuthUrl: 'https://connect.reapit.cloud',
    connectLoginRedirectPath: '',
    connectLogoutRedirectPath: '/login',
    connectContainerId: '#reapit-connect-component',
    connectHasSessionCallback
  })
</script>

```

## Node Usage

For server side usage, we also export a Node module with a stripped down API that simply returns a promise from a connectAccessToken method. For a basic and slightly contrived example, see the simple Express app below:

```ts
import 'isomorphic-fetch'
import express, { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ReapitConnectServerSession, ReapitConnectServerSessionInitializers } from '@reapit/connect-session'
import config from './config.json'

const router = Router()

const { connectClientId, connectClientSecret, connectOAuthUrl } = config as ReapitConnectServerSessionInitializers

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

As per the browser usage, you will need to instantiate the class with your initializers, in this case connectClientId, connectOAuthUrl (in the same way as the browser module), but with the addition of the connectClientSecret you obtain from your app listing page.

The module will fetch and refresh your session as the token expires, caching it locally to minimise calls to Reapit Connect token endpoint.
