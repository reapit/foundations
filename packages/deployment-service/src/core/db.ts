import { Connection, createConnection, getConnection } from 'typeorm'
import {SecretsManager} from 'aws-sdk'
import { SubDomainSubscriber } from '../subscribers/sub-domain'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity } from './../entities'
import migrations from './../../migrations'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

let connection: Connection | null = null

export const connect = async (): Promise<Connection | never> => {

  const secretManager = new SecretsManager({
    region: 'eu-west-1',
  })
  if (!process.env.DATABASE_SECERT_ARN) {
    throw new Error('No db secret arn present')
  }

  const secrets = await secretManager.getSecretValue({ SecretId: process.env.DATABASE_SECERT_ARN }).promise()

  console.log('secret data', secrets)

  const mysqlConfig: MysqlConnectionOptions = {
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity],
    subscribers: [SubDomainSubscriber],
    migrations,
    type: 'mysql',
    database: '',
    host: '',
    username: '',
    password: '',
    // host: secrets.host,
    // username: secrets.username,
    // password: secrets.password,
    // database: secrets.database,
  }

  if (connection !== null) return Promise.resolve(connection)

  try {
    connection = await getConnection()
  } catch {
    connection = await createConnection(mysqlConfig)
  }

  return connection
}
