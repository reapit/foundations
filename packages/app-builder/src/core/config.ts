export const graphqlUri = window.location.hostname.includes('localhost')
  ? 'http://localhost:4000/graphql'
  : 'https://zbtuirnf0g.execute-api.eu-west-2.amazonaws.com/prod/'
