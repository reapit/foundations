type APIRegion = 'uk' | 'anz'
type MappedAPIConfig = {
  region: APIRegion
}
type DomainMap = Record<string, MappedAPIConfig>

const isMappedApiConfig = (obj: any): obj is MappedAPIConfig => {
  return obj.region && (obj.region === 'uk' || obj.region === 'anz')
}
const getRegion = (): APIRegion => {
  if (process.env.domainMappings) {
    const config: DomainMap = JSON.parse(process.env.domainMappings)
    const domainConfig = config[window.location.hostname]
    if (isMappedApiConfig(domainConfig)) {
      return domainConfig.region
    }
  }
  return 'uk'
}

const region = getRegion()
const isDev = process.env.appEnv !== 'production'

export const getPlatformApiUrl = () => {
  if (region === 'anz') {
    if (isDev) {
      return 'https://platform.au.dev.rc.reapit.cloud'
    } else {
      return 'https://platform.au.rc.reapit.cloud'
    }
  }

  if (isDev) {
    return 'https://platform.dev.paas.reapit.cloud'
  } else {
    return 'https://platform.reapit.cloud'
  }
}
