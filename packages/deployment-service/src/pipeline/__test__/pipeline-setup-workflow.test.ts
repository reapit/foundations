import { Test } from '@nestjs/testing'
import { PipelineSetupWorkflow } from '../pipeline-setup-workflow'
import { PusherProvider, SqsProvider } from '../../events'
import { PipelineProvider } from '../pipeline-provider'
import { SQS, S3 } from 'aws-sdk'
import { CloudFrontClient, ListOriginAccessControlsCommand } from '@aws-sdk/client-cloudfront'
import { Route53Client } from '@aws-sdk/client-route-53'
import { S3Provider } from '../../s3'
import { v4 as uuid } from 'uuid'
import { SQSRecord } from 'aws-lambda'
import { INestApplication } from '@nestjs/common'
import { MarketplaceProvider } from '../../marketplace'

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

const mockMarketplaceProvider = {
  updateAppUrls: jest.fn(() => Promise.resolve()),
  getAppDetails: jest.fn(() => Promise.resolve({})),
}

describe('PipelineSetupWorkflow', () => {
  let app: INestApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
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
        {
          provide: MarketplaceProvider,
          useValue: mockMarketplaceProvider,
        },
      ],
    }).compile()

    app = module.createNestApplication()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Successfully provision', async () => {
    const pipelineSetupWorkflow = app.get<PipelineSetupWorkflow>(PipelineSetupWorkflow)
    const pipelineId = uuid()
    const developerId = uuid()

    mockCloudFrontClient.send.mockImplementation((event) => {
      if (event instanceof ListOriginAccessControlsCommand) {
        return {
          OriginAccessControlList: {
            Items: [
              {
                Name: 'distro-to-s3',
                Id: 'AOCID',
              },
            ],
          },
        }
      }

      return {
        Distribution: {
          DomainName: 'domain',
          Id: 'id',
        },
      }
    })

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
        buildStatus: 'PROVISION_REQUEST',
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
      runtime: 'NODE_16',
    })
    expect(mockCloudFrontClient.send).toHaveBeenCalled()
    expect(mockRoute53Client.send).toHaveBeenCalled()
    expect(mockSqsProvider.deleteMessage).toHaveBeenCalled()
    expect(mockMarketplaceProvider.updateAppUrls).toHaveBeenCalled()
  })

  it('Failed to provision result', async () => {
    const pipelineSetupWorkflow = app.get<PipelineSetupWorkflow>(PipelineSetupWorkflow)
    const pipelineId = uuid()
    const developerId = uuid()

    mockCloudFrontClient.send.mockImplementationOnce(() => undefined)

    mockPipelineProvider.update.mockImplementation((prev, dto) => ({
      ...prev,
      ...dto,
    }))

    await pipelineSetupWorkflow.run({
      receiptHandle: 'receipt',
      body: JSON.stringify({
        id: pipelineId,
        developerId,
        buildStatus: 'PROVISION_REQUEST',
      }),
    } as SQSRecord)

    expect(mockPusherProvider.trigger).toHaveBeenLastCalledWith(`private-${developerId}`, 'pipeline-update', {
      buildCommand: 'build',
      buildStatus: 'FAILED_TO_PROVISION',
      id: pipelineId,
      message: 'Failed to architect',
      outDir: 'build',
      developerId,
      runtime: 'NODE_16',
    })
    expect(mockRoute53Client.send).not.toHaveBeenCalled()
    expect(mockSqsProvider.deleteMessage).toHaveBeenCalled()
  })
})
