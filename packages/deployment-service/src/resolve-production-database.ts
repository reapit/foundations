import 'reflect-metadata'
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
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'
import { CreateDBClusterSnapshotCommand, RDSClient } from '@aws-sdk/client-rds'
import { v4 as uuid } from 'uuid'

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
  if (!process.env.TEMPORARY_CLUSTER_SECRET_ARN) {
    throw new Error('No temporary cluster secret arn present')
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
  if (!process.env.STACK_CLUSTER_SECRET_ARN) {
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

export const resolveProductionDatabase: OnEventHandler = async (event) => {
  if (event.RequestType === 'Delete')
    return {
      PhysicalResourceId: event.PhysicalResourceId,
      Data: {
        skipped: true,
      },
    }

  const rdsClient = new RDSClient({
    region: 'eu-west-2',
  })

  await rdsClient.send(
    new CreateDBClusterSnapshotCommand({
      DBClusterSnapshotIdentifier: 'pre-deployment-service-fix-' + uuid(),
      DBClusterIdentifier: process.env.TEMPORARY_CLUSTER_ID,
    }),
  )

  const tempConfig = await tempDatabaseConfig()
  const stackConfig = await stackDatabaseConfig()

  const tempConnection = new DataSource(tempConfig)

  const stackConnection = new DataSource(stackConfig)

  await tempConnection.initialize()
  await stackConnection.initialize()

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

  return {
    PhysicalResourceId: event.PhysicalResourceId,
    Data: {},
  }
}
