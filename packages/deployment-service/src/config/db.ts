import { registerAs } from '@nestjs/config'
import { SecretsManager } from 'aws-sdk'
import { SubDomainSubscriber } from '../pipeline/sub-domain'
import migrations from './../../migrations'
import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { TaskEntity } from '../entities/task.entity'
import { BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { GithubRepositoryEntity } from '../github/github.repository.entity'

const defaultDatabaseConfig: Partial<MysqlConnectionOptions> & { type: 'mysql' } = {
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, BitbucketClientEntity, GithubRepositoryEntity],
  subscribers: [SubDomainSubscriber],
  migrations,
  type: 'mysql',
}

export const liveDatabaseConfig = async (): Promise<MysqlConnectionOptions> => {
  const secretManager = new SecretsManager({
    region: 'eu-west-2',
  })
  if (!process.env.DATABASE_SECRET_ARN) {
    throw new Error('No db secret arn present')
  }

  const secrets = await secretManager.getSecretValue({ SecretId: process.env.DATABASE_SECRET_ARN }).promise()

  if (!secrets.SecretString) {
    throw new Error('Failed to get secret')
  }

  const data = JSON.parse(secrets.SecretString)

  return {
    ...defaultDatabaseConfig,
    database: data.dbname,
    host: data.host,
    username: data.username,
    password: data.password,
  }
}

export default registerAs('database', async () => {
  return {
    ...defaultDatabaseConfig,
    database: 'deployments',
    host: 'localhost',
    username: 'dev',
    password: 'root',
    port: 3306,
  }
})
