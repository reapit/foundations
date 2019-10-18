// @ts-ignore
require('dotenv').config({
  path: '../src/constants/.env'
})
require('isomorphic-fetch')

const fs = require('fs')
const sw2dts = require('sw2dts')

const BASE_URL = 'https://reapit.cloud.tyk.io'

const apiSchema = [
  {
    definitionFile: `${__dirname}/src/types/property.ts`,
    endpoint: `${BASE_URL}/properties/swagger/v1/swagger.json`,
  }, {
    definitionFile: `${__dirname}/src/types/propertyImage.ts`,
    endpoint: `${BASE_URL}/propertyImages/swagger/v1/swagger.json`,
  }
]

// Fetch definitions for a given schema
const fetchDefinitionsForSchema = async schemaConfig => {
    const { definitionFile, endpoint, headers } = schemaConfig
    const response = await fetch(endpoint, {
      headers
    })
    console.log(response)
    if (response.status < 400) {
      const definitions = await response.json()

      // Convert definitions to TypeScript interfaces
      const convertedDefinitions = await sw2dts.convert(definitions, { withQuery: true })
      console.log(`Successfully fetched type definitions for: ${endpoint}`)

      // Write interfaces to file
      fs.writeFile(definitionFile, convertedDefinitions, error => {
        if (error) {
          console.error(`Failed to write type definitions for: ${endpoint}`)
          throw error
        } else {
          console.log(`Successfully wrote type definitions for: ${endpoint}`)
        }
      })
    } else {
      throw new Error(`Failed to fetch type definitions for: ${endpoint}`)
    }
  }

  // Fetch definitions for all schemas
;(async () => {
  return Promise.all(apiSchema.map(fetchDefinitionsForSchema))
})().catch(err => {
  console.error(JSON.stringify(err))
  process.exit(1)
})
