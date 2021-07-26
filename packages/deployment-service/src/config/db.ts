import { ConnectionOptions } from 'typeorm'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity, ReleaseEntity } from './../entities'

const defaultDbConfig = {
  logging: true,
  synchronize: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, ReleaseEntity],
}

// TODO change this so that production doesn't use data-api as VPC allows us to use mysql by default
export const dbConfig: ConnectionOptions =
  process.env.NODE_ENV === 'prod' // TODO solve this condition
    ? {
        type: 'aurora-data-api',
        region: process.env.AURORA_REGION as string,
        secretArn: process.env.AURORA_SECRET_ARN as string,
        resourceArn: process.env.AURORA_RESOURCE_ARN as string,
        database: process.env.AURORA_DATABASE as string,
        ...defaultDbConfig,
      }
    : {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        ...defaultDbConfig,
      }
