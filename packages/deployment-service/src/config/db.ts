import { SubDomainSubscriber } from '../subscribers/sub-domain'
import { ConnectionOptions } from 'typeorm'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity, ReleaseEntity } from './../entities'
import migrations from './../../migrations'

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, ReleaseEntity],
  subscribers: [SubDomainSubscriber],
  migrations,
  // connectTimeout: 30 * 1000,
}
