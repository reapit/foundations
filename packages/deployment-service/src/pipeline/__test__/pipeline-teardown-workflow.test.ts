import { Test } from '@nestjs/testing'
import { EventDispatcher, PusherProvider, SqsProvider } from '../../events'
import { PipelineProvider } from '../pipeline-provider'
import { SQS, S3 } from 'aws-sdk'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import { Route53Client } from '@aws-sdk/client-route-53'
import { S3Provider } from '../../s3'
import { SQSRecord } from 'aws-lambda'
import { v4 as uuid } from 'uuid'
import { PipelineTearDownWorkflow } from '../pipeline-teardown-workflow'
import { ParameterProvider } from '..'
import { TaskProvider, PipelineRunnerProvider } from '../../pipeline-runner'
import { INestApplication } from '@nestjs/common'
import { ACMClient } from '@aws-sdk/client-acm'

const mockS3Provider = {
  upload: jest.fn(),
  deleteObject: jest.fn(),
}

const mockPipelineProvider = {
  update: jest.fn(),
  delete: jest.fn(),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockCloudFrontClient = {
  send: jest.fn((data) => console.log(data)),
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

const mockParameterProvider = {
  destroyParameters: jest.fn(),
}

const mockPipelineRunnerProvider = {
  delete: jest.fn(),
  deleteForPipeline: jest.fn(),
}

const mockTaskProvider = {
  deleteForPipeline: jest.fn(),
}

describe('PipelineTearDownWorkflow', () => {
  let app: INestApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PipelineTearDownWorkflow,
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
        {
          provide: ParameterProvider,
          useValue: mockParameterProvider,
        },
        {
          provide: TaskProvider,
          useValue: mockTaskProvider,
        },
        {
          provide: PipelineRunnerProvider,
          useValue: mockPipelineRunnerProvider,
        },
        {
          provide: ACMClient,
          useValue: jest.fn(),
        },
      ],
    }).compile()

    app = module.createNestApplication()
  })

  it('Can call pipeline teardown', async () => {
    const pipelineTearDownStartWorkflow = app.get<PipelineTearDownWorkflow>(PipelineTearDownWorkflow)

    mockCloudFrontClient.send.mockImplementation(() => ({
      Distribution: {
        DistributionConfig: {},
      },
    }))

    await pipelineTearDownStartWorkflow.run({
      body: JSON.stringify({
        buildStatus: 'FAILED',
        cloudFrontId: uuid(),
        aRecordId: uuid(),
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockCloudFrontClient.send).toHaveBeenCalled()
    expect(mockRoute53Client.send).toHaveBeenCalled()
    expect(mockParameterProvider.destroyParameters).toHaveBeenCalled()
    expect(mockPipelineProvider.delete).toHaveBeenCalled()
    expect(mockS3Provider.deleteObject).toHaveBeenCalled()
    expect(mockTaskProvider.deleteForPipeline).toHaveBeenCalled()
    expect(mockPipelineRunnerProvider.deleteForPipeline).toHaveBeenCalled()
  })
})
