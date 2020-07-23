import { ReapitConnectBrowserSession } from '@reapit/connect-session'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.cognitoClientId,
  connectOAuthUrl: window.reapit.config.cognitoOAuthUrl,
  connectLoginRedirectPath: window.reapit.config.connectLoginRedirectPath,
})
console.log({ debug: reapitConnectBrowserSession.connectSession().then(cfg => console.log(cfg)) })
