import { S3Module, S3Provider } from '../../s3'
import { Test, TestingModule } from '@nestjs/testing'
import { DeploymentModule } from '../module'
import { DeployProvider } from '../deploy-provider'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { S3 } from 'aws-sdk'

jest.mock('adm-zip', jest.fn(() => ({
  extractAllToAsync: jest.fn((file: string, something, another, callback) => {
    callback()
  }),
})))

class MockS3Provider extends S3Provider {
  upload(params): Promise<any> {
    console.log('upload called', params)
    return Promise.resolve({
      Key: params.Key,
    })
  }

  getObject(params): Promise<S3.GetObjectOutput> {
    return Promise.resolve({
      Body: Buffer.from(''),
    })
  }

  deleteObject(params): Promise<void> {
    return Promise.resolve()
  }
}

describe('DeploymentProvider', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [S3Module, DeploymentModule],
    })
    .overrideProvider(S3Provider)
    .useClass(MockS3Provider)
    .compile()
  })

  it('deployFromStore', async () => {
    const deployProvider = module.get<DeployProvider>(DeployProvider)

    const pipeline = plainToClass(PipelineEntity, {
      repositoryId: 12345,
      repo: 'https://github.com/bashleigh/i-am-cool',
      cloudFrontId: 'cloud-front-id',
    })

    const pipelineRunner = plainToClass(PipelineRunnerEntity, {
      pipeline,
    })

    await deployProvider.deployFromStore({
      pipeline,
      pipelineRunner,
    })
  })
})