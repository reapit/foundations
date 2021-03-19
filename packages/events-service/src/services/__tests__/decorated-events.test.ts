import { DecoratedEvents } from '../decorated-events'
import stubbedEvent from '../__stubs__/event'

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
  it('the fetchEventBodies function should return the stubbed event', async () => {
    const events = await new DecoratedEvents('1234', '1234').fetchEventsFromListById([mockEventStatus])
    expect(events.length).toBe(1)
    expect(events[0].id).toBe(mockEventStatus.eventId)
  })

  it('the addActionsToEventBodies function should return an event with actions of some type', async () => {
    const events = await new DecoratedEvents('1234', '1234').addActionsToEvents([stubbedEvent])
    expect(events.length).toBe(1)
    expect(events[0].actions.length).toBe(2)
    expect(events[0].actions[0]).toBe('contact')
    expect(events[0].actions[1]).toBe('dismiss')
  })

  it('the retrieveByEventStatusList function should run the correct steps', async () => {
    const mock1 = (DecoratedEvents.prototype.fetchEventsFromListById = jest.fn())
    const mock2 = (DecoratedEvents.prototype.addActionsToEvents = jest.fn())
    const mock3 = (DecoratedEvents.prototype.addConversationMessagesToEvents = jest.fn())

    await new DecoratedEvents('1234', '1234').retrieveByEventStatusList([mockEventStatus])

    expect(mock1).toHaveBeenCalledTimes(1)
    expect(mock2).toHaveBeenCalledTimes(1)
    expect(mock3).toHaveBeenCalledTimes(1)
  })

  it('the retrieveByRecentEvents function should run the correct steps', async () => {
    const mock1 = (DecoratedEvents.prototype.fetchRecentEvents = jest.fn())
    const mock2 = (DecoratedEvents.prototype.addStatusToEvents = jest.fn())
    const mock3 = (DecoratedEvents.prototype.addActionsToEvents = jest.fn())
    const mock4 = (DecoratedEvents.prototype.addConversationMessagesToEvents = jest.fn())

    await new DecoratedEvents('1234', '1234').retrieveByRecentEvents()

    expect(mock1).toHaveBeenCalledTimes(1)
    expect(mock2).toHaveBeenCalledTimes(1)
    expect(mock3).toHaveBeenCalledTimes(1)
    expect(mock4).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
