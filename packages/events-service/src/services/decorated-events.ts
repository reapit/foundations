import twilio, { Twilio } from 'twilio'
import { TWILIO, PLATFORM_API_BASE_URL } from '../core/constants'
import { logger } from '../core/logger'
import { Event } from '../types/event'
import { EventStatus } from '../schemas/event-status.schema'
import { Conversation, generateConversationItem } from '../schemas/conversation.schema'
import { db } from '../core/db'
import stubEvent from './__stubs__/event'

interface DecoratedEvent extends Event {
  status?: string
  actions?: string[]
  messages?: any[] // need to define the exact type we want here
}

export class DecoratedEvents {
  traceId: string
  accessToken: string
  twilioClient: Twilio

  constructor(traceId: string, accessToken: string) {
    this.traceId = traceId
    this.accessToken = accessToken
    this.twilioClient = twilio(TWILIO.accountId, TWILIO.authToken)
  }

  logInfo(msg: string, extra?: object) {
    logger.info(`DecoratedEvents: ${msg}`, { traceId: this.traceId, ...extra })
  }

  logError(msg: string, extra?: object) {
    logger.error(`DecoratedEvents: ${msg}`, { traceId: this.traceId, ...extra })
  }

  async retrieveByEventStatusList(eventStatuses: EventStatus[]): Promise<DecoratedEvent[]> {
    // 1. pull the body of each eventIds in the list (stubbed for now)
    let events = await this.fetchEventsFromListById(eventStatuses)
    // 2. decorate the actions from a constants file
    events = await this.addActionsToEvents(events)
    // 3. search for automation-initiated messages and pull them in
    events = await this.addConversationMessagesToEvents(events)

    return events
  }

  async retrieveByRecentEvents(): Promise<DecoratedEvent[]> {
    // 1. pull recents events from the events API
    let events = await this.fetchRecentEvents()

    // 2. add the status to each event and then filter where status is outstanding
    events = this.addStatusToEvents(events)
    events = events ? events.filter((event) => event.status === 'outstanding') : []

    // 3. decorate the actions from a constants file
    events = await this.addActionsToEvents(events)
    // 4. search for automation-initiated messages and pull them in
    events = await this.addConversationMessagesToEvents(events)

    return events
  }

  async fetchEventsFromListById(eventStatusList: EventStatus[]): Promise<DecoratedEvent[]> {
    // for each event ID in this.events, request the actual event from the Events API
    // This is stubbed for now since the API endpoint needed doesn't exist yet
    return eventStatusList.map(
      (event) =>
        ({
          ...stubEvent,
          id: event.eventId,
          published: event.eventCreatedAt,
        } as DecoratedEvent),
    )
  }

  async fetchRecentEvents(): Promise<DecoratedEvent[]> {
    // do api query
    const url = `${PLATFORM_API_BASE_URL}/events`
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: this.accessToken,
          'api-version': '2021-03-17',
        },
      })
      const events = await response.json()
      // pageSize parameter on the API call doesn't seem to work, so just return an appropriate subset of events
      if (events._embedded && events._embedded.length > 0) return events._embedded.slice(0, 10)
      return []
    } catch (e) {
      return []
    }
  }

  addStatusToEvents(events: DecoratedEvent[]): DecoratedEvent[] {
    // TODO: need to retrieve the status of each event from the event-status table.
    // For now, since none of these will have statuses because they are all stub
    // events, just set them all to outstanding, and save the database lookup...
    return events.map((event) => ({
      ...event,
      status: 'outstanding',
    }))
  }

  async addActionsToEvents(events: DecoratedEvent[]): Promise<DecoratedEvent[]> {
    const ACT_TYPE = {
      CONTACT: 'contact',
    }
    const actions = {
      enquiry: [ACT_TYPE.CONTACT],
      sellingValuationEnquiry: [ACT_TYPE.CONTACT],
      lettingValuationEnquiry: [ACT_TYPE.CONTACT],
    }
    // for each event, check the type and add relevant actions from a constants file
    return events.map((event) => ({
      ...event,
      actions: actions[event.type],
    }))
  }

  async addConversationMessagesToEvents(events: DecoratedEvent[]): Promise<DecoratedEvent[]> {
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
