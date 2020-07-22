import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { Config } from '../types/global'

export const ReapitConnectBrowserSessionInstance = {
  _instance: ReapitConnectBrowserSession,
  get instance() {
    return this._instance
  },
  initInstance: function(config: Config) {
    this._instance = new ReapitConnectBrowserSession({
      connectClientId: config.cognitoClientId,
      connectOAuthUrl: config.cognitoOAuthUrl,
    })
  },
}
