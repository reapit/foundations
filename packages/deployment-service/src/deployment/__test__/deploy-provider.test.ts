import { S3Module, S3Provider } from '../../s3'
import { Test } from '@nestjs/testing'
import { DeploymentModule } from '../module'
import { DeployProvider } from '../deploy-provider'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { S3 } from 'aws-sdk'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { InvalidPipelineResourcesException } from '../../exceptions'
import AdmZip from 'adm-zip'
import { INestApplication } from '@nestjs/common'

process.env.NODE_ENV = 'local'

class MockS3Provider extends S3Provider {
  upload(params): Promise<any> {
    return Promise.resolve({
      Key: params.Key,
    })
  }

  getObject(): Promise<S3.GetObjectOutput> {
    const zip = new AdmZip()
    return Promise.resolve({
      Body: zip.toBuffer(),
    })
  }

  deleteObject(): Promise<void> {
    return Promise.resolve()
  }
}

class MockCloudFrontProvider {
  send = jest.fn(() => Promise.resolve())
}

describe('DeploymentProvider', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [S3Module, DeploymentModule],
    })
      .overrideProvider(S3Provider)
      .useClass(MockS3Provider)
      .overrideProvider(CloudFrontClient)
      .useClass(MockCloudFrontProvider)
      .compile()

      app = module.createNestApplication()
  })

  it('deployFromStore', async () => {
    const deployProvider = app.get<DeployProvider>(DeployProvider)

    const pipeline = plainToClass(PipelineEntity, {
      repositoryId: 12345,
      repo: 'https://github.com/bashleigh/i-am-cool',
    })

    const pipelineRunner = plainToClass(PipelineRunnerEntity, {
      pipeline,
    })

    // @ts-ignore
    pipelineRunner.pipeline.cloudFrontId = 'cloud-front-id'

    await deployProvider.deployFromStore({
      pipeline,
      pipelineRunner,
    })
  })

  it('deployFromStore with pipeline exception', async () => {
    const deployProvider = app.get<DeployProvider>(DeployProvider)

    const pipeline = plainToClass(PipelineEntity, {
      repositoryId: 12345,
      repo: 'https://github.com/bashleigh/i-am-cool',
    })

    const pipelineRunner = plainToClass(PipelineRunnerEntity, {
      pipeline,
    })

    try {
      await deployProvider.deployFromStore({
        pipeline,
        pipelineRunner,
      })
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidPipelineResourcesException)
    }
  })
})
