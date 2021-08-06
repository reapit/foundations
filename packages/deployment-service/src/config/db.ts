import { ConnectionOptions } from 'typeorm'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity, ReleaseEntity } from './../entities'

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: true,
  synchronize: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, ReleaseEntity],
}
