import { ConnectionOptions } from 'typeorm'
import * as entities from '@/entities'

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  logging: ['error'],
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  entities: Object.keys(entities).map((module) => entities[module]),
}
