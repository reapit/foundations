import { EventDispatcher } from '../../events'
import { PipelineProvider } from '../../pipeline'
import { Test } from '@nestjs/testing'
import { AppEventWorkflow } from '../app-event-workflow'
import { SQSRecord } from 'aws-lambda'
import { SqsProvider } from '../../events'
import { INestApplication } from '@nestjs/common'
import { MarketplaceProvider } from 'src/marketplace'

const mockPipelineProvider = {
  create: jest.fn(),
  saveAll: jest.fn(() => [{}]),
  findByAppId: jest.fn(() => [{}]),
}

const mockEventDispatcher = {
  triggerPipelineTearDownStart: jest.fn(),
}

const mockMarketplaceProvider = {
  updateAppUrls: jest.fn(),
}

describe('AppEventWorkflow', () => {
  let app: INestApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        {
          provide: EventDispatcher,
          useValue: mockEventDispatcher,
        },
        {
          provide: MarketplaceProvider,
          useValue: mockMarketplaceProvider,
        },
        {
          provide: SqsProvider,
          useValue: {
            deleteMessage: jest.fn(),
          },
        },
        AppEventWorkflow,
      ],
    }).compile()

    app = module.createNestApplication()
  })

  it('Can create pipeline', () => {
    const appEventWorkflow = app.get<AppEventWorkflow>(AppEventWorkflow)

    appEventWorkflow.run({
      body: JSON.stringify({
        AppId: 'AppId',
        ApplicationName: 'ApplicationName',
        AuthFlow: 'authorisationCode',
        DeveloperId: 'developer-id',
        Type: 'created',
      }),
    } as SQSRecord)

    expect(mockMarketplaceProvider.updateAppUrls).toHaveBeenCalled()
    expect(mockPipelineProvider.create).toHaveBeenCalled()
  })

  it('Can delete pipeline', async () => {
    const appEventWorkflow = app.get<AppEventWorkflow>(AppEventWorkflow)

    await appEventWorkflow.run({
      body: JSON.stringify({
        AppId: 'AppId',
        ApplicationName: 'ApplicationName',
        AuthFlow: 'authorisationCode',
        DeveloperId: 'developer-id',
        Type: 'deleted',
      }),
    } as SQSRecord)

    expect(mockEventDispatcher.triggerPipelineTearDownStart).toHaveBeenCalled()
    expect(mockPipelineProvider.saveAll).toHaveBeenCalled()
  })
})
