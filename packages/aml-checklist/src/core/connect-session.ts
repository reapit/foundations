import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import config from '../../config.json'

export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: config.cognitoClientId,
  connectOAuthUrl: config.cognitoOAuthUrl,
})
