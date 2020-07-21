import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { Config } from '../types/global'

export const ReapitConnectBrowserSessionInstance = {
  instance: ReapitConnectBrowserSession,
  initInstance: function(config: Config) {
    this.instance = new ReapitConnectBrowserSession({
      connectClientId: config.cognitoClientId,
      connectOAuthUrl: config.cognitoOAuthUrl,
    })
  },
}
