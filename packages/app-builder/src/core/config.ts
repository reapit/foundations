export const graphqlUri =
  window.location.hostname.includes('localhost') || window.location.hostname.includes('.local')
    ? 'http://localhost:4000/graphql'
    : window.location.protocol + '//' + window.location.hostname.replace('app-builder', 'app-builder-backend')
