export type DBConfig = {
  region: string
  endpoint: string
}

export const dbConfig: DBConfig = {
  region: process.env.DYNAMO_DB_REGION || '',
  endpoint: process.env.DYNAMO_DB_ENDPOINT || '',
}
