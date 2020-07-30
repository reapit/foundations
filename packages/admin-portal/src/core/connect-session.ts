import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import Routes from '@/constants/routes'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.cognitoClientId,
  connectOAuthUrl: window.reapit.config.cognitoOAuthUrl,
  connectLoginRedirectPath: Routes.APPROVALS,
})
