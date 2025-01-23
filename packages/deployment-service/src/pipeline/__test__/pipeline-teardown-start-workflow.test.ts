import { Test } from '@nestjs/testing'
import { EventDispatcher, PusherProvider, SqsProvider } from '../../events'
import { PipelineProvider } from '../pipeline-provider'
import { SQS, S3 } from 'aws-sdk'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { Route53Client } from '@aws-sdk/client-route-53'
import { S3Provider } from '../../s3'
import { PipelineTearDownStartWorkflow } from '../pipeline-teardown-start-workflow'
import { SQSRecord } from 'aws-lambda'
import { v4 as uuid } from 'uuid'
import { INestApplication } from '@nestjs/common'

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

const mockEventDispatcher = {
  triggerPipelineTearDown: jest.fn(),
}

describe('PipelineTearDownStartWorkflow', () => {
  let app: INestApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PipelineTearDownStartWorkflow,
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
        {
          provide: EventDispatcher,
          useValue: mockEventDispatcher,
        },
      ],
    }).compile()

    app = module.createNestApplication()
  })

  it('Can call pipeline teardown', async () => {
    const pipelineTearDownStartWorkflow = app.get<PipelineTearDownStartWorkflow>(PipelineTearDownStartWorkflow)

    mockCloudFrontClient.send.mockImplementation(() => ({
      Distribution: {
        DistributionConfig: {},
      },
    }))

    await pipelineTearDownStartWorkflow.run({
      body: JSON.stringify({
        buildStatus: 'FAILED',
        cloudFrontId: uuid(),
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockEventDispatcher.triggerPipelineTearDown).toHaveBeenCalled()
    expect(mockCloudFrontClient.send).toHaveBeenCalled()
  })
})
