require('dotenv').config({
  path: '../src/constants/.env'
})
require('isomorphic-fetch')

const fs = require('fs')
const sw2dts = require('sw2dts')

const apiSchema = {
  definitionFile: `${__dirname}/../types/platform.ts`,
  endpoint: 'https://dev.platform.reapit.net/docs'
}

// Fetch definitions for a given schema
const fetchDefinitionsForSchema = async schemaConfig => {
    const { definitionFile, endpoint } = schemaConfig
    const response = await fetch(endpoint)

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
  try {
    await fetchDefinitionsForSchema(apiSchema)
  } catch (err) {
    console.error(JSON.stringify(err))
    process.exit(1)
  }
})()
