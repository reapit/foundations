import { ConnectionOptions } from 'typeorm'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity } from './../entities'

export const dbConfig: ConnectionOptions = {
  type: 'aurora-data-api',
  logging: ['error'],
  username: process.env.AURORA_USERNAME as string,
  database: process.env.AURORA_DATABASE as string,
  password: process.env.AURORA_PASSWORD as string,
  region: process.env.DYNAMO_DB_REGION as string,
  secretArn: process.env.AURORA_SECRET_ARN as string,
  resourceArn: process.env.AURORA_RESOURCE_ARN as string,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity],
}
