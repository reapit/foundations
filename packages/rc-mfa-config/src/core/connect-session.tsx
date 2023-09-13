import { ReapitConnectBrowserSession, ReapitConnectBrowserSessionInitializers } from '@reapit/connect-session'
import Cookie from 'js-cookie'

type MappedRCMFAConfig = {
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
}
type DomainMap = Record<string, MappedRCMFAConfig>

const isReapitConnectBrowserSessionInitializers = (obj: any): obj is ReapitConnectBrowserSessionInitializers => {
  return obj.connectClientId && obj.connectOAuthUrl && obj.connectUserPoolId
}

const cookieOverride = (config: ReapitConnectBrowserSessionInitializers): ReapitConnectBrowserSessionInitializers => {
  const connectOAuthUrl = Cookie.get('rc_e2e_oauth_url')
  if (connectOAuthUrl) {
    return { ...config, connectOAuthUrl }
  }
  return config
}

export const getRCConfig = (): ReapitConnectBrowserSessionInitializers => {
  if (process.env.domainMappings) {
    const config: DomainMap = JSON.parse(process.env.domainMappings)
    const domainConfig = config[window.location.hostname]
    if (isReapitConnectBrowserSessionInitializers(domainConfig)) {
      return cookieOverride(domainConfig)
    }
  }
  if (isReapitConnectBrowserSessionInitializers(process.env)) {
    return process.env
  }
  if (process.env.NODE_ENV === 'test') {
    return process.env as ReapitConnectBrowserSessionInitializers
  }
  throw new Error('Invalid RC Config')
}

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession(getRCConfig())
