import { Connection, createConnection } from 'typeorm'
import { SubDomainSubscriber } from '../subscribers/sub-domain'
import { TaskEntity } from '../entities/task.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import migrations from './../../migrations'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { getSecretValue } from '../utils/get-secret-value'

let connection: Connection | null = null

export const connect = async (): Promise<Connection | never> => {
  if (!process.env.DATABASE_SECERT_ARN) {
    throw new Error('No db secret arn present')
  }

  const secret = await getSecretValue(process.env.DATABASE_SECERT_ARN)

  const data = JSON.parse(secret)

  const mysqlConfig: MysqlConnectionOptions = {
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, BitbucketClientEntity],
    subscribers: [SubDomainSubscriber],
    migrations,
    type: 'mysql',
    database: data.dbname,
    host: data.host,
    username: data.username,
    password: data.password,
  }

  if (connection !== null) return Promise.resolve(connection)
  connection = await createConnection(mysqlConfig)

  return connection
}
