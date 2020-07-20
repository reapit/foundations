import { ReapitConnectBrowserSession } from '@reapit/connect-session'
// Referencing config direct rather than via window because window.reapit.config not available at compile time
// and throws a runtime error
import config from '../../config.json'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: config.cognitoClientId,
  connectOAuthUrl: config.cognitoOAuthUrl,
})
