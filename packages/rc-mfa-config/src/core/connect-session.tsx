import { ReapitConnectBrowserSession, ReapitConnectBrowserSessionInitializers } from '@reapit/connect-session'

type MappedRCMFAConfig = {
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
}
type DomainMap = Record<string, MappedRCMFAConfig>

const isReapitConnectBrowserSessionInitializers = (obj: any): obj is ReapitConnectBrowserSessionInitializers => {
  return obj.connectClientId && obj.connectOAuthUrl && obj.connectUserPoolId
}

const getRCConfig = (): ReapitConnectBrowserSessionInitializers => {
  if (process.env.domainMappings) {
    const config: DomainMap = JSON.parse(process.env.domainMappings)
    const domainConfig = config[window.location.hostname]
    if (isReapitConnectBrowserSessionInitializers(domainConfig)) {
      return domainConfig
    }
  }
  if (isReapitConnectBrowserSessionInitializers(process.env)) {
    return process.env
  }
  throw new Error('Invalid RC Config')
}

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSession(getRCConfig())
