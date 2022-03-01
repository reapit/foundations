const { hostname = '', protocol = '' } = window.location // for tests

export const graphqlUri =
  hostname.includes('localhost') || hostname.includes('.local')
    ? 'http://localhost:4000/graphql'
    : protocol + '//' + hostname.replace('app-builder', 'app-builder-backend')
