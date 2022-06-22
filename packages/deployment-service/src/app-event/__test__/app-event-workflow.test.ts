import { EventDispatcher } from '../../events'
import { PipelineProvider } from '../../pipeline'
import { Test, TestingModule } from '@nestjs/testing'
import { AppEventWorkflow } from '../app-event-workflow'
import { SQSRecord } from 'aws-lambda'
import { SqsProvider } from '../../events'

const mockPipelineProvider = {
  create: jest.fn(),
  saveAll: jest.fn(() => [{}]),
  findByAppId: jest.fn(() => [{}]),
}

const mockEventDispatcher = {
  triggerPipelineTearDownStart: jest.fn(),
}

describe('AppEventWorkflow', () => {
  let module: TestingModule
  beforeAll(async () => {
    module = await Test.createTestingModule({
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
          provide: SqsProvider,
          useValue: {
            deleteMessage: jest.fn(),
          },
        },
        AppEventWorkflow,
      ],
    }).compile()
  })

  it('Can create pipeline', () => {
    const appEventWorkflow = module.get<AppEventWorkflow>(AppEventWorkflow)

    appEventWorkflow.run({
      body: JSON.stringify({
        AppId: 'AppId',
        ApplicationName: 'ApplicationName',
        AuthFlow: 'authorisationCode',
        DeveloperId: 'developer-id',
        Type: 'created',
      }),
    } as SQSRecord)

    expect(mockPipelineProvider.create).toHaveBeenCalled()
  })

  it('Can delete pipeline', async () => {
    const appEventWorkflow = module.get<AppEventWorkflow>(AppEventWorkflow)

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
