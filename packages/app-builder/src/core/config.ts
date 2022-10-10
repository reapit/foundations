const { hostname = '' } = window.location // for tests

const isDev = hostname.endsWith('dev.paas.reapit.cloud')
const isProd = hostname.endsWith('prod.paas.reapit.cloud') || (hostname.includes('reapit.cloud') && !isDev)
const isLocal = hostname.includes('localhost') || hostname.includes('.local')

export const isEditor = () => {
  const { location } = window
  return location?.hostname?.startsWith('app-builder') || location?.hostname?.startsWith('localhost')
}

export let graphqlUri

if (isLocal) {
  graphqlUri = 'http://localhost:4000/graphql'
}

if (isDev) {
  graphqlUri = 'https://app-builder-backend.dev.paas.reapit.cloud'
}

if (isProd) {
  graphqlUri = 'https://app-builder-backend.prod.paas.reapit.cloud'
}
