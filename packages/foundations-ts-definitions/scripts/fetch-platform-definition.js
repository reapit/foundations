require("dotenv").config({
  path: "../src/constants/.env"
});
require("isomorphic-fetch");

const fs = require("fs");
const path = require("path");
const sw2dts = require("sw2dts");
const prettifyCode = require('./format-code')

const apiSchema = [
  {
    definitionFile: path.resolve(
      __dirname,
      "../types/platform-schema.ts"
    ),
    endpoint: `https://dev.platform.reapit.net/docs`,
  }
];

// Fetch definitions for a given schema
const fetchDefinitionsForSchema = async schemaConfig => {
  const { definitionFile, endpoint, headers } = schemaConfig;
  const response = await fetch(endpoint, {
    headers
  });
  if (response.status < 400) {
    const definitions = await response.json();

    // Convert definitions to TypeScript interfaces
    const convertedDefinitions = await sw2dts.convert(definitions, {
      withQuery: true
    });
    console.log(`Successfully fetched type definitions for: ${endpoint}`);

    const cookedDefinitions = convertedDefinitions.replace(
      /\[name[^;]+}/g,
      "[name: string]:any"
    );

    const formatDefinitions = prettifyCode(cookedDefinitions);

    // Write interfaces to file
    fs.writeFile(
      definitionFile,
      formatDefinitions,

      { flag: "a+" },
      error => {
        if (error) {
          console.error(`Failed to write type definitions for: ${endpoint}`);
          throw error;
        } else {
          console.log(`Successfully wrote type definitions for: ${endpoint}`);
        }
      }
    );
  } else {
    throw new Error(`Failed to fetch type definitions for: ${endpoint}`);
  }
};

// Fetch definitions for all schemas
(async () => {
  return Promise.all(apiSchema.map(fetchDefinitionsForSchema));
})().catch(err => {
  console.error(JSON.stringify(err.message));
  process.exit(1);
});
