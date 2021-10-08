# Login With Reapit

A button component for logging in with reapit-connect-session.

## Install

```bash
$ yarn add @reapit/login-with-reapit
```

```bash
$ npm i --save @reapit/login-with-reapit
```

## Usage

```ts
import { reapitConnectComponent } from '@reapit/login-with-reapit'

const connectHasSessionCallback = (reapitConnectBrowserSession) => {
  reapitConnectBrowserSession.connectSession().then(session => {
    console.log('Session is', session)
  })
}

reapitConnectComponent({
  connectClientId: '', // Your client Id
  connectOAuthUrl: 'https://connect.reapit.cloud', // Our OAuth url
  connectLoginRedirectPath: '', // Your logout page path (when logging in)
  connectLogoutRedirectPath: '/login', // Your login page path (when logging out)
  rootElement: document.querySelector('#reapit-connect-component'), // Your Element on the page
  connectHasSessionCallback, // The callback for when the session is created
  companyName: "Test Company", // Your Company name
})
```
