import { ReapitConnectBrowserSession, ReapitConnectBrowserSessionInitializers } from '@reapit/connect-session'

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
  connectClientId: window.reapit.config.connectClientId,
  connectOAuthUrl: window.reapit.config.connectOAuthUrl,
  connectUserPoolId: window.reapit.config.connectUserPoolId,
})

const sessions: Record<string, ReapitConnectBrowserSession> = {}

export const getReapitConnectBrowserSession = (config: ReapitConnectBrowserSessionInitializers) => {
  if (!sessions[config.connectClientId]) {
    sessions[config.connectClientId] = new ReapitConnectBrowserSession(config)
  }
  return sessions[config.connectClientId]
}
