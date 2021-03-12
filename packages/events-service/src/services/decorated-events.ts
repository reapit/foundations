import twilio, { Twilio } from 'twilio'
import { TWILIO } from '../core/constants'
import { logger } from '../core/logger'
import { EventStatus } from '../schemas/event-status.schema'
import { Conversation, generateConversationItem } from '../schemas/conversation.schema'
import { db } from '../core/db'
import stubEvent from './__stubs__/event'

interface DecoratedEvent {
  // todo: inherit from the base event type...
  id: string
  type: string
  published: string
  actions?: string[]
  messages?: any[] // need to define the exact type we want here
}

export class DecoratedEvents {
  traceId: string
  twilioClient: Twilio

  constructor(traceId: string) {
    this.traceId = traceId
    this.twilioClient = twilio(TWILIO.accountId, TWILIO.authToken)
  }

  logInfo(msg: string, extra?: object) {
    logger.info(`DecoratedEvents: ${msg}`, { traceId: this.traceId, ...extra })
  }

  logError(msg: string, extra?: object) {
    logger.error(`DecoratedEvents: ${msg}`, { traceId: this.traceId, ...extra })
  }

  async retrieveByEventStatusList(eventStatuses: EventStatus[]): Promise<DecoratedEvent[]> {
    // 1. pull the body of those eventIds (stubbed for now)
    let events = await this.fetchEventBodies(eventStatuses)
    // 2. decorate the actions from a constants file
    events = await this.addActionsToEventBodies(events)
    // 3. search for automation-initiated messages and pull them in
    events = await this.addConversationMessagesToEventBodies(events)

    return events
  }

  async fetchEventBodies(eventsMatchingQuery: EventStatus[]): Promise<DecoratedEvent[]> {
    // for each event ID in this.events, request the actual event from the Events API (when it's live)
    return eventsMatchingQuery.map(
      (event) =>
        ({
          ...stubEvent,
          id: event.eventId,
          published: event.eventCreatedAt,
        } as DecoratedEvent),
    )
  }

  async addActionsToEventBodies(events: DecoratedEvent[]): Promise<DecoratedEvent[]> {
    const ACT_TYPE = {
      CONTACT: 'contact',
    }
    const actions = {
      testEventType: [ACT_TYPE.CONTACT],
      enquiry: [ACT_TYPE.CONTACT],
    }
    // for each event, check the type and add relevant actions from a constants file
    return events.map((event) => ({
      ...event,
      actions: actions[event.type],
    }))
  }

  async addConversationMessagesToEventBodies(events: DecoratedEvent[]): Promise<DecoratedEvent[]> {
    // for each event, check if there's any conversations in the conversations table
    // if there is, get the non-automated messages from Twilio
    return await Promise.all(
      events.map(async (event: DecoratedEvent) => {
        let conversation: Conversation

        try {
          const itemToRetrieveFromDb = generateConversationItem({ eventId: event.id })
          conversation = await db.get(itemToRetrieveFromDb)
          if (!conversation || !conversation.twilioConversationId) return event
        } catch (error) {
          if (error.name === 'ItemNotFoundException') {
            // there's no conversation, but that's not a problem - just return as-is
            return event
          }
          this.logError(error)
          return event
        }

        try {
          event.messages = await this.twilioClient.conversations
            .conversations(conversation.twilioConversationId)
            .messages.list({ limit: 10 })
          return event
        } catch (e) {
          this.logError(e, { conversation })
          return event
        }
      }),
    )
  }
}
