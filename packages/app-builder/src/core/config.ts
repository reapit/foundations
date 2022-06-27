const { hostname = '', protocol = '' } = window.location // for tests

const isDev = hostname.endsWith('dev.paas.reapit.cloud')
const isProd = hostname.endsWith('prod.paas.reapit.cloud') || !hostname.includes('.paas.reapit.cloud')
const isLocal = hostname.includes('localhost') || hostname.includes('.local')

export let graphqlUri = isDev ? 'http://localhost:4000/graphql' : 'https://api.reapit.cloud/graphql'

if (isLocal) {
  graphqlUri = `${protocol}://localhost:4000/graphql`
}

if (isDev) {
  graphqlUri = 'https://app-builder-backend.dev.paas.reapit.cloud'
}

if (isProd) {
  graphqlUri = 'https://app-builder-backend.prod.paas.reapit.cloud'
}
