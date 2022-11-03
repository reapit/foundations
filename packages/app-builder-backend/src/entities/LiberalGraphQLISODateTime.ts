import { GraphQLScalarType, Kind } from 'graphql'

function convertStringToDate(dateString) {
  try {
    return new Date(dateString)
  } catch (_a) {
    throw new Error('Provided date string is invalid and cannot be parsed')
  }
}

export const LiberalGraphQLISODateTime = new GraphQLScalarType({
  name: 'LiberalDateTime',
  description: 'The javascript `Date` as string. Type represents date and time as the ISO Date string.',
  serialize(value) {
    if (typeof value === 'string') {
      return value
    }
    if (!(value instanceof Date)) {
      throw new Error(`Unable to serialize value '${value}' as it's not an instance of 'Date'`)
    }
    return value.toISOString()
  },
  parseValue(value) {
    if (typeof value !== 'string') {
      throw new Error(`Unable to parse value '${value}' as GraphQLISODateTime scalar supports only string values`)
    }
    return convertStringToDate(value)
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error(
        `Unable to parse literal value of kind '${ast.kind}' as GraphQLISODateTime scalar supports only '${Kind.STRING}' ones`,
      )
    }
    return convertStringToDate(ast.value)
  },
})