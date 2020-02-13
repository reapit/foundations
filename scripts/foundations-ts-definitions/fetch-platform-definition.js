require('isomorphic-fetch')

const fs = require('fs')
const path = require('path')
const sw2dts = require('sw2dts')
const prettifyCode = require('./format-code')

const { FOUNDATION_TYPES_FOLDER } = require('./constants')
const config = require(path.resolve(__dirname, '../../reapit-config.json'))
const configDev = config['DEV']
const { PLATFORM_API_BASE_URL } = configDev

// Fetch definitions for a given schema
const fetchDefinitionsForSchema = async schemaConfig => {
  const { definitionFile, endpoint, headers } = schemaConfig
  const response = await fetch(endpoint, {
    headers,
  })
  if (response.status < 400) {
    const definitions = await response.json()

    // Convert definitions to TypeScript interfaces
    const convertedDefinitions = await sw2dts.convert(definitions, {
      withQuery: true,
    })
    console.log(`Successfully fetched type definitions for: ${endpoint}`)

    const cookedDefinitions = convertedDefinitions.replace(/\[name[^;]+}/g, '[name: string]:any')

    const formatDefinitions = prettifyCode(cookedDefinitions)

    // Write interfaces to file
    fs.writeFileSync(
      definitionFile,
      formatDefinitions,

      { flag: 'a+' },
      error => {
        if (error) {
          console.error(`Failed to write type definitions for: ${endpoint}`)
          throw error
        } else {
          console.log(`Successfully wrote type definitions for: ${endpoint}`)
        }
      },
    )
  } else {
    throw new Error(`Failed to fetch type definitions for: ${endpoint}`)
  }
}

// Fetch definitions for all schemas
module.exports = async apiVersion => {
  const apiSchema = [
    {
      definitionFile: path.resolve(FOUNDATION_TYPES_FOLDER, './platform-schema.ts'),
      endpoint: `${PLATFORM_API_BASE_URL}/docs`,
      headers: {
        'api-version': apiVersion,
      },
    },
  ]

  return Promise.all(apiSchema.map(fetchDefinitionsForSchema))
}
