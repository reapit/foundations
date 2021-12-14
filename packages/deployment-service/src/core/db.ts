import { Connection, createConnection } from 'typeorm'
import { SecretsManager } from 'aws-sdk'
import { SubDomainSubscriber } from '../subscribers/sub-domain'
import { TaskEntity, PipelineEntity, PipelineRunnerEntity } from './../entities'
import migrations from './../../migrations'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

let connection: Connection | null = null

export const connect = async (): Promise<Connection | never> => {
  const secretManager = new SecretsManager({
    region: 'eu-west-2',
  })
  if (!process.env.DATABASE_SECERT_ARN) {
    throw new Error('No db secret arn present')
  }

  const secrets = await secretManager.getSecretValue({ SecretId: process.env.DATABASE_SECERT_ARN }).promise()

  if (!secrets.SecretString) {
    throw new Error('Failed to get secret')
  }

  const data = JSON.parse(secrets.SecretString)

  const mysqlConfig: MysqlConnectionOptions = {
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity],
    subscribers: [SubDomainSubscriber],
    migrations,
    type: 'mysql',
    database: data.dbname,
    host: data.host,
    username: data.username,
    password: data.password,
  }

  if (connection !== null) return Promise.resolve(connection)

  // try {
  // connection = await getConnection()
  // } catch (error: any) {
  //   if (error instanceof ConnectionNotFoundError) {
  connection = await createConnection(mysqlConfig)
  //   } else {
  //     throw error
  //   }
  // }

  return connection
}
