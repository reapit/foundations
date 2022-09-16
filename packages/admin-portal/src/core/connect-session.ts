import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import Routes from '../constants/routes'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.connectClientId,
  connectOAuthUrl: window.reapit.config.connectOAuthUrl,
  connectLoginRedirectPath: Routes.APPS,
  connectUserPoolId: window.reapit.config.connectUserPoolId,
})
