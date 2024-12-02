import { DataSource } from 'typeorm'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { PipelineEntity } from './entities/pipeline.entity'
import { PipelineRunnerEntity } from './entities/pipeline-runner.entity'
import { TaskEntity } from './entities/task.entity'
import { BitbucketClientEntity } from './entities/bitbucket-client.entity'
import { RepositoryEntity } from './entities/repository.entity'
import { SubDomainSubscriber } from './pipeline/sub-domain'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import migrations from './../migrations'

const defaultDatabaseConfig: Partial<MysqlConnectionOptions> & { type: 'mysql' } = {
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [PipelineEntity, PipelineRunnerEntity, TaskEntity, BitbucketClientEntity, RepositoryEntity],
  subscribers: [SubDomainSubscriber],
  migrations,
  type: 'mysql',
}

const secretsManagerClient = new SecretsManagerClient({})

const tempDatabaseConfig = async () => {
  if (!process.env.DATABASE_SECRET_ARN) {
    throw new Error('No db secret arn present')
  }

  const secrets = await secretsManagerClient.send(
    new GetSecretValueCommand({
      SecretId: process.env.TEMPORARY_CLUSTER_SECRET_ARN,
    }),
  )

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

const stackDatabaseConfig = async () => {
  if (!process.env.DATABASE_SECRET_ARN) {
    throw new Error('No db secret arn present')
  }

  const secrets = await secretsManagerClient.send(
    new GetSecretValueCommand({
      SecretId: process.env.STACK_CLUSTER_SECRET_ARN,
    }),
  )

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

export const resolveProductionDatabase = async () => {
  /**
   * TODO
   *
   * Dump database out of temp cluster
   *
   * store dump
   *
   * dump into stack cluster
   *
   */

  // OR use ORM on temp, select * from table and instert into table to stack cluster

  const tempConfig = await tempDatabaseConfig()
  const stackConfig = await stackDatabaseConfig()

  const tempConnection = new DataSource(tempConfig)

  const stackConnection = new DataSource(stackConfig)

  const tempPipelineRepo = tempConnection.getRepository(PipelineEntity)
  const tempRepoRepo = tempConnection.getRepository(RepositoryEntity)
  const tempPipelineRunnersRepo = tempConnection.getRepository(PipelineRunnerEntity)
  const taskRepo = tempConnection.getRepository(TaskEntity)
  const bitbucketRepo = tempConnection.getRepository(BitbucketClientEntity)

  const pipelines = await tempPipelineRepo.find()
  const repositories = await tempRepoRepo.find()
  const pipelineRunners = await tempPipelineRunnersRepo.find()
  const tasks = await taskRepo.find()
  const bitBucketRepos = await bitbucketRepo.find()

  const stackPipelineRepo = stackConnection.getRepository(PipelineEntity)
  const stackRepoRepo = stackConnection.getRepository(RepositoryEntity)
  const stackPipelineRunnerRepo = stackConnection.getRepository(PipelineRunnerEntity)
  const stackTaskRepo = stackConnection.getRepository(TaskEntity)
  const stackBitBucketRepo = stackConnection.getRepository(BitbucketClientEntity)

  // TODO will probably have overlaps of child repositories causing duplications
  await stackPipelineRepo.save(pipelines)
  await stackPipelineRunnerRepo.save(pipelineRunners)
  await stackRepoRepo.save(repositories)
  await stackTaskRepo.save(tasks)
  await stackBitBucketRepo.save(bitBucketRepos)
}
