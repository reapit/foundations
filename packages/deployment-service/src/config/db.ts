import { ConnectionOptions } from 'typeorm'

export const dbConfig: ConnectionOptions = {
  type: 'aurora-data-api',
  logging: ['error'],
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE as string,
  password: process.env.DB_PASSWORD,
  region: '',
  secretArn: '',
  resourceArn: '',
  entities: ['**/*/*.entity.ts'],
}
