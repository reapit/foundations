import { SubDomainSubscriber } from '../subscribers/sub-domain'
import { ConnectionOptions } from 'typeorm'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity, ReleaseEntity } from './../entities'
import migrations from './../../migrations'

const {
  AURORA_SECRET_ARN,
  AURORA_RESOURCE_ARN,
  AURORA_REGION,

  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,

  MYSQL_DATABASE,
} = process.env

const baseConfig = {
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, ReleaseEntity],
  subscribers: [SubDomainSubscriber],
  migrations,
}

const auroraConfig = {
  ...baseConfig,
  type: 'aurora-data-api',
  secretArn: AURORA_SECRET_ARN,
  resourceArn: AURORA_RESOURCE_ARN,
  region: AURORA_REGION,
  database: MYSQL_DATABASE,
}

const mysqlConfig = {
  ...baseConfig,
  type: 'mysql',
  host: MYSQL_HOST,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
}

export const dbConfig = (AURORA_RESOURCE_ARN ? auroraConfig : mysqlConfig) as ConnectionOptions
