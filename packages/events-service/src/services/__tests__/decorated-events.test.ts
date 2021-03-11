import { DecoratedEvents } from '../decorated-events'

jest.mock('../../core/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}))
jest.mock('twilio')

const mockEventStatus = {
  eventId: '1234',
  clientCode: 'SBOX',
  status: 'outstanding',
  eventCreatedAt: '2020-01-01T00:00:00Z',
  statusCreatedAt: '2020-01-01T00:00:00Z',
  statusUpdatedAt: '2020-01-01T00:00:00Z',
}

describe('DecoratedEvents', () => {
  it('the retrieveByEventStatusList function should run the correct steps', async () => {
    const mock1 = (DecoratedEvents.prototype.fetchEventBodies = jest.fn())
    const mock2 = (DecoratedEvents.prototype.addActionsToEventBodies = jest.fn())
    const mock3 = (DecoratedEvents.prototype.addConversationMessagesToEventBodies = jest.fn())

    await new DecoratedEvents('1234').retrieveByEventStatusList([mockEventStatus])

    expect(mock1).toHaveBeenCalledTimes(1)
    expect(mock2).toHaveBeenCalledTimes(1)
    expect(mock3).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
