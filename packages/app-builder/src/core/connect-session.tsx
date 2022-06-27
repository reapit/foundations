import { ReapitConnectBrowserSession, ReapitConnectBrowserSessionInitializers } from '@reapit/connect-session'

const sessions: Record<string, ReapitConnectBrowserSession> = {}

export const getReapitConnectBrowserSession = (config: ReapitConnectBrowserSessionInitializers) => {
  if (!sessions[config.connectClientId]) {
    sessions[config.connectClientId] = new ReapitConnectBrowserSession(config)
  }
  return sessions[config.connectClientId]
}
