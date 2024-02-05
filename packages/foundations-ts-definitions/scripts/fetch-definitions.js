require('isomorphic-fetch')

const fs = require('fs')
const path = require('path')
const sw2dts = require('sw2dts')
const prettifyCode = require('./format-code')
const { FOUNDATIONS_TYPES_FOLDER, PLATFORM_API_BASE_URL } = require('./constants')
const { existsSync, mkdirSync } = require('fs')
const createIndexFile = require('./create-index-file')
const { sync: rimraf } = require('rimraf')

// Fetch definitions for a given schema
const fetchDefinitionsForSchema = async (schemaConfig) => {
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

    const formatDefinitions = await prettifyCode(cookedDefinitions)

    // Write interfaces to file
    fs.writeFileSync(
      definitionFile,
      formatDefinitions,

      { flag: 'a+' },
      (error) => {
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
const fetchSchema = async (apiVersion) => {
  if (existsSync(FOUNDATIONS_TYPES_FOLDER)) {
    rimraf(FOUNDATIONS_TYPES_FOLDER)
  }

  mkdirSync(FOUNDATIONS_TYPES_FOLDER)

  const apiSchema = [
    {
      definitionFile: path.resolve(FOUNDATIONS_TYPES_FOLDER, './platform-schema.ts'),
      // normally this would be at `${PLATFORM_API_BASE_URL}/docs`, but endpoint down for now. Using fallback for now
      endpoint: `https://reapit-swagger-dev.s3.eu-west-2.amazonaws.com/foundations_swagger.json`,
      headers: {
        'api-version': apiVersion,
      },
    },
    {
      definitionFile: path.resolve(FOUNDATIONS_TYPES_FOLDER, './marketplace-schema.ts'),
      endpoint: `${PLATFORM_API_BASE_URL}/marketplace/swagger/v1/swagger.json`,
      headers: {
        'api-version': apiVersion,
      },
    },
    {
      definitionFile: path.resolve(FOUNDATIONS_TYPES_FOLDER, './payments-schema.ts'),
      endpoint: `${PLATFORM_API_BASE_URL}/payments/swagger/latest/swagger.json`,
      headers: {
        'api-version': apiVersion,
      },
    },
    {
      definitionFile: path.resolve(FOUNDATIONS_TYPES_FOLDER, './organisations-schema.ts'),
      endpoint: `${PLATFORM_API_BASE_URL}/organisations/swagger/latest/swagger.json`,
      headers: {
        'api-version': apiVersion,
      },
    },
  ]

  return Promise.all(apiSchema.map(fetchDefinitionsForSchema))
}

fetchSchema()
  .then(createIndexFile)
  .catch((error) => console.error(error))
