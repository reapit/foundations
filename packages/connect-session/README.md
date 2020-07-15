# Cognito Auth

![lines](./src/tests/badges/badge-lines.svg) ![functions](./src/tests/badges/badge-functions.svg) ![branches](./src/tests/badges/badge-branches.svg) ![statements](./src/tests/badges/badge-statements.svg)

A thin wrapper around the AWS SDK and OAuth flow to take the pain out of authenticating your App with Reapit Connect. For usage visit [here](https://foundations-documentation.reapit.cloud/api/web#cognito-auth) and [here](https://foundations-documentation.reapit.cloud/open-source/packages#cognito-auth).

- **Tech Stack**: AWS JavaScript SDK
- **Cloud Services**: NPM, AWS Cognito
- **Production**: https://www.npmjs.com/package/@reapit/cognito-auth

```ts
  import { ReapitConnectBrowserSession } from '@reapit/connect-utils'

  const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
    connectClientId: window.reapit.config.cognitoClientId,
    connectOAuthUrl: window.reapit.config.cognitoOAuthUrl,
    connectLoginRedirectUri: '/',
    connectLogoutRedirectUri: '/login',
  })

  export default reapitConnectBrowserSession
```

```ts
import('./auth')
```
