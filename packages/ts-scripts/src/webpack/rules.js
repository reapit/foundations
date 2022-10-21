const graphql = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: 'graphql-tag/loader',
}

module.exports = { graphql }
