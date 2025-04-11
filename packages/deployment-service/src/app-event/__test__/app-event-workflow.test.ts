import { Test } from '@nestjs/testing'
import { AppEventWorkflow } from '../app-event-workflow'
import { EventDispatcher, SqsProvider } from '../../events'
import { PipelineProvider } from '../../pipeline'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { SQSRecord } from 'aws-lambda'

const mockDeveloperId = 'developer-id'

const mockPipeline: Partial<PipelineEntity> = {
  developerId: mockDeveloperId,
  subDomain: 'test-domain',
}

const mockPipelineProvider = {
  findById: jest.fn((id) =>
    Promise.resolve({
      ...mockPipeline,
      id,
    }),
  ),
  findByAppId: jest.fn((id) => Promise.resolve([{ ...mockPipeline, id, appId: id }])),
  update: jest.fn((pipeline) => Promise.resolve(pipeline)),
  create: jest.fn((pipeline) => Promise.resolve(pipeline)),
  saveAll: jest.fn(() => Promise.resolve()),
}

const mockSqsProvider = {
  deleteMessage: jest.fn(() => Promise.resolve()),
}

const mockEventDispatcherProvider = {
  triggerPipelineTearDownStart: jest.fn(() => Promise.resolve()),
}

describe('AppEventWorkflow', () => {
  let workflow: AppEventWorkflow

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [EventDispatcher, PipelineProvider, SqsProvider, AppEventWorkflow],
    })
      .overrideProvider(PipelineProvider)
      .useValue(mockPipelineProvider)
      .overrideProvider(SqsProvider)
      .useValue(mockSqsProvider)
      .overrideProvider(EventDispatcher)
      .useValue(mockEventDispatcherProvider)
      .compile()

    workflow = module.get(AppEventWorkflow)
  })

  afterEach(() => {
    mockPipelineProvider.create.mockReset()
    mockPipelineProvider.update.mockReset()
  })

  it('Create Event', async () => {
    await workflow.run({
      body: JSON.stringify({
        AppId: '',
        Type: 'created',
        TimeStamp: new Date().toISOString(),
        ApplicationName: 'ApplicationName',
        AuthFlow: 'authorisationCode',
        DeveloperId: mockDeveloperId,
      }),
    } as SQSRecord),
      expect(mockPipelineProvider.create).toHaveBeenCalled()
    expect(mockSqsProvider.deleteMessage).toHaveBeenCalled()
  })

  it('Delete Event', async () => {
    await workflow.run({
      body: JSON.stringify({
        AppId: '',
        Type: 'deleted',
        TimeStamp: new Date().toISOString(),
        ApplicationName: 'ApplicationName',
        AuthFlow: 'authorisationCode',
        DeveloperId: mockDeveloperId,
      }),
    } as SQSRecord)

    expect(mockEventDispatcherProvider.triggerPipelineTearDownStart).toHaveBeenCalled()
    expect(mockSqsProvider.deleteMessage).toHaveBeenCalled()
  })
})
