import { ReapitConnectBrowserSession } from '@reapit/connect-session'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: process.env.connectClientId,
  connectOAuthUrl: process.env.connectOAuthUrl,
  connectUserPoolId: process.env.connectUserPoolId,
  connectLoginRedirectPath: '/installed',
})
