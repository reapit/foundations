import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { DataSource } from 'typeorm'
import { PipelineEntity } from './entities/pipeline.entity'
import { PipelineRunnerEntity } from './entities/pipeline-runner.entity'
import { TaskEntity } from './entities/task.entity'
import { BitbucketClientEntity } from './entities/bitbucket-client.entity'
import { RepositoryEntity } from './entities/repository.entity'
import { SubDomainSubscriber } from './pipeline/sub-domain'
import migrations from './../migrations'

const defaultCredentials = {
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, BitbucketClientEntity, RepositoryEntity],
  subscribers: [SubDomainSubscriber],
  migrations,
}

const fetchCredentialsFromSecret = async (): Promise<{
  database: string
  host: string
  username: string
  password: string
}> => {
  const client = new SecretsManagerClient({})

  const result = await client.send(
    new GetSecretValueCommand({
      SecretId: process.env.DATABASE_SECRET_ARN,
    }),
  )

  if (!result.ARN || !result.SecretString) throw Error('Failed to fetch secret')

  const data = JSON.parse(result.SecretString)

  return {
    database: data.dbname,
    host: data.host,
    username: data.username,
    password: data.password,
  }
}

export const handler = async (event) => {
  const databaseCredentials = await fetchCredentialsFromSecret()
  const connection = new DataSource({
    type: 'mysql',
    ...defaultCredentials,
    ...databaseCredentials,
  })

  await connection.initialize()

  console.log('event', event)
  const direction: 'run' | 'revert' = event.RequestType === 'Delete' ? 'revert' : 'run'

  console.log('direction', direction, 'running...')

  await connection[direction === 'run' ? 'runMigrations' : 'undoLastMigration']()

  console.log('completed')

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
