import { appEventsHandler } from '../app-events'
import { SQSRecord, Context } from 'aws-lambda'
import { createPipelineEntity, sqs } from '../../services'

const APP_ID = 'APP_ID'
const DEVELOPER_ID = 'DEVELOPER_ID'

const creationEvent = {
  AppId: APP_ID,
  ApplicationName: 'Creation',
  Type: 'created',
  AuthFlow: 'authorisationCode',
  DeveloperId: DEVELOPER_ID,
}

const deletionEvent = {
  AppId: APP_ID,
  ApplicationName: 'Deletion',
  Type: 'deleted',
  AuthFlow: 'authorisationCode',
  DeveloperId: DEVELOPER_ID,
}

const updateEvent = {
  AppId: APP_ID,
  ApplicationName: 'Update',
  Type: 'updated',
  AuthFlow: 'authorisationCode',
  DeveloperId: DEVELOPER_ID,
}

jest.mock('../../services/github-app', () => ({
  githubApp: () => {
    return {}
  },
}))

jest.mock('../../services/pipeline', () => ({
  createPipelineEntity: jest.fn((obj) => {
    return obj
  }),
  findPipelinesByAppId: jest.fn((appId) => {
    return Promise.resolve([{ appId }])
  }),
}))

jest.mock('../../services/sqs', () => ({
  sqs: {
    deleteMessage: jest.fn((params, callback) => {
      callback()
    }),
    sendMessage: jest.fn((params, callback) => {
      callback()
    }),
  },
}))

describe('AppEvents', () => {
  afterEach(() => {
    // @ts-ignore
    createPipelineEntity.mockClear()
  })

  it('Can create pipeline from app creation', async () => {
    await appEventsHandler(
      {
        Records: [
          {
            body: JSON.stringify(creationEvent),
            messageId: '',
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(createPipelineEntity).toHaveBeenCalled()
    expect(sqs.deleteMessage).toHaveBeenCalled()
    expect(sqs.sendMessage).not.toHaveBeenCalled()
  })

  it('Can update pipeline from app update', async () => {
    await appEventsHandler(
      {
        Records: [
          {
            body: JSON.stringify(updateEvent),
            messageId: '',
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(createPipelineEntity).not.toHaveBeenCalled()
    expect(sqs.sendMessage).not.toHaveBeenCalled()
    expect(sqs.deleteMessage).toHaveBeenCalled()
  })

  it('Can delete pipeline from app deletion', async () => {
    await appEventsHandler(
      {
        Records: [
          {
            body: JSON.stringify(deletionEvent),
            messageId: '',
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(createPipelineEntity).not.toHaveBeenCalled()
    expect(sqs.sendMessage).toHaveBeenCalled()
    expect(sqs.deleteMessage).toHaveBeenCalled()
  })
})
