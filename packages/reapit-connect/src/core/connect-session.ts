import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import Routes from '@/constants/routes'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: process.env.connectClientId,
  connectOAuthUrl: process.env.connectOAuthUrl,
  connectLoginRedirectPath: Routes.WELCOME,
  connectLogoutRedirectPath: Routes.LOGIN,
  connectUserPoolId: process.env.connectUserPoolId,
})
