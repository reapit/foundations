import { Test, TestingModule } from '@nestjs/testing'
import { PipelineSetupWorkflow } from '../pipeline-setup-workflow'
import { PusherProvider, SqsProvider } from '../../events'
import { PipelineProvider } from '../pipeline-provider'
import { SQS, S3 } from 'aws-sdk'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { Route53Client } from '@aws-sdk/client-route-53'
import { S3Provider } from '../../s3'
import { v4 as uuid } from 'uuid'
import { SQSRecord } from 'aws-lambda'

const mockS3Provider = {
  upload: jest.fn(),
}

const mockPipelineProvider = {
  update: jest.fn(),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockCloudFrontClient = {
  send: jest.fn(),
}

const mockRoute53Client = {
  send: jest.fn(),
}

const mockSqsProvider = {
  deleteMessage: jest.fn(),
}

describe('PipelineSetupWorkflow', () => {
  let module: TestingModule
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PipelineSetupWorkflow,
        {
          provide: S3,
          useValue: {},
        },
        {
          provide: S3Provider,
          useValue: mockS3Provider,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        {
          provide: SQS,
          useValue: {},
        },
        {
          provide: SqsProvider,
          useValue: mockSqsProvider,
        },
        {
          provide: CloudFrontClient,
          useValue: mockCloudFrontClient,
        },
        {
          provide: Route53Client,
          useValue: mockRoute53Client,
        },
      ],
    }).compile()
  })

  it('Successfully provision', async () => {
    const pipelineSetupWorkflow = module.get<PipelineSetupWorkflow>(PipelineSetupWorkflow)
    const pipelineId = uuid()
    const developerId = uuid()

    mockCloudFrontClient.send.mockImplementationOnce(() => ({
      Distribution: {
        DomainName: 'domain',
        Id: 'id',
      },
    }))

    mockRoute53Client.send.mockImplementationOnce(() => ({
      ChangeInfo: {
        Id: 'id',
      },
    }))

    mockPipelineProvider.update.mockImplementation((prev, dto) => ({
      ...prev,
      ...dto,
    }))

    await pipelineSetupWorkflow.run({
      receiptHandle: 'receipt',
      body: JSON.stringify({
        id: pipelineId,
        developerId,
        buildStatus: 'READY_FOR_DEPLOYMENT',
      }),
    } as SQSRecord)

    expect(mockPusherProvider.trigger).toHaveBeenLastCalledWith(`private-${developerId}`, 'pipeline-update', {
      aRecordId: 'id',
      buildCommand: 'build',
      buildStatus: 'READY_FOR_DEPLOYMENT',
      cloudFrontId: 'id',
      id: pipelineId,
      message: 'Pipeline successfully created',
      outDir: 'build',
      developerId,
    })
  })
})
