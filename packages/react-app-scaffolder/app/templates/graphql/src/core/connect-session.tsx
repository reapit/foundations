import { ReapitConnectBrowserSession } from '@reapit/connect-session'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.connectClientId,
  connectOAuthUrl: window.reapit.config.connectOAuthUrl,
  connectUserPoolId: window.reapit.config.connectUserPoolId,
})
