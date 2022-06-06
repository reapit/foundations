import { S3Module, S3Provider } from '../../s3'
import { Test, TestingModule } from '@nestjs/testing'
import { DeploymentModule } from '../module'
import { DeployProvider } from '../deploy-provider'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { S3 } from 'aws-sdk'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'

process.env.NODE_ENV = 'local'

jest.mock('adm-zip', () => {
  class MockAdmZip {
    extractAllToAsync = jest.fn((file: string, something, another, callback) => {
      callback()
    })
  }

  return MockAdmZip
})

class MockS3Provider extends S3Provider {
  upload(params): Promise<any> {
    return Promise.resolve({
      Key: params.Key,
    })
  }

  getObject(): Promise<S3.GetObjectOutput> {
    return Promise.resolve({
      Body: Buffer.from(''),
    })
  }
  cd

  deleteObject(): Promise<void> {
    return Promise.resolve()
  }
}

class MockCloudFrontProvider {
  send = jest.fn(() => Promise.resolve())
}

describe('DeploymentProvider', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [S3Module, DeploymentModule],
    })
      .overrideProvider(S3Provider)
      .useClass(MockS3Provider)
      .overrideProvider(CloudFrontClient)
      .useClass(MockCloudFrontProvider)
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
