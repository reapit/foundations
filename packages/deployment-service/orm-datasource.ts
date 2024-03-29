import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'mysql',
  username: 'dev',
  password: 'root',
  host: '127.0.0.1',
  database: 'deployments',
  entities: ['./src/entities/*.entity.ts'],
  migrations: ['./migrations/index.ts']
})
