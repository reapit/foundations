import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.cognitoClientId,
  connectOAuthUrl: window.reapit.config.cognitoOAuthUrl,
})
