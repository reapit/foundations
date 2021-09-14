export const graphqlUri = window.location.hostname.includes('localhost')
  ? 'http://localhost:4000/graphql'
  : 'https://zbtuirnf0g.execute-api.eu-west-2.amazonaws.com/prod/'

export const ejectUri = window.location.hostname.includes('localhost')
  ? 'http://localhost:4000/'
  : 'https://zbtuirnf0g.execute-api.eu-west-2.amazonaws.com/prod/'
