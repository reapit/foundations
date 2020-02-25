// https://stackoverflow.com/questions/48226686/serverless-yml-touppercase#48249468
module.exports.provider = serverless => {
  // The `serverless` argument containers all the information in the .yml file
  const provider = serverless.service.provider

  return Object.entries(provider).reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key]:
        typeof value === 'string'
          ? {
              lowercase: value.toLowerCase(),
              uppercase: value.toUpperCase(),
            }
          : value,
    }),
    {},
  )
}
