import twilio, { Twilio } from 'twilio'
import { TWILIO } from '../core/constants'
import { logger } from '../core/logger'
import { Automation } from '../schemas/automation.schema'
import { generateConversationItem } from '../schemas/conversation.schema'
import { Event } from '../types/event'
import { db } from '../core/db'

export class AutomationExecution {
  event: Event
  automation: Automation
  traceId: string
  client: Twilio

  constructor(event: Event, automation: Automation, traceId: string) {
    this.event = event
    this.automation = automation
    this.traceId = traceId
    this.client = twilio(TWILIO.accountId, TWILIO.authToken)
  }

  logInfo(msg: string, extra?: object) {
    logger.info(`AutomationExecution: ${msg}`, { traceId: this.traceId, ...extra })
  }

  logError(msg: string, extra: object) {
    logger.error(`AutomationExecution: ${msg}`, { traceId: this.traceId, ...extra })
  }

  automationActionMapper() {
    const { automation } = this
    // only supporting SMS automations at this stage. May add whatsapp, etc later on
    if (automation.messageChannel === 'sms') return this.sms
    this.logError('No function exists to handle the messageChannel requested', { automation })
    return false
  }

  async execute() {
    const actionFn = this.automationActionMapper()
    if (actionFn) await actionFn.bind(this)()
  }

  getMessageBodyWithFieldsReplaced(): string {
    // TODO: decide on actual placeholder fields we want to support
    if (!this.automation.messageBody) return ''
    return this.automation.messageBody.replace('{property}', '123 Fake Street, London')
  }

  async sms() {
    const { client, event, automation } = this

    // create twilio conversation with the contact in the event
    const conversation = await client.conversations.conversations.create({
      friendlyName: `Conversation with ${event.contact.telephoneNumber}, from automation ${automation.id}`,
    })
    this.logInfo('Created conversation', { conversation })

    const participant = await client.conversations.conversations(conversation.sid).participants.create({
      messagingBinding: {
        address: event.contact.telephoneNumber,
        // TODO: this will probably need to be one Twilio phone number per agent, or maybe even per
        // property or something? The limitiation is that an SMS user can only be part of one
        // conversation with a twilio number at any one time. It'll also need to come from config...
        proxyAddress: '+447481346105',
      },
    })
    this.logInfo('Added participant', { participant })

    // send SMS with the body from the automation
    const twilioMessage = await client.conversations.conversations(conversation.sid).messages.create({
      author: 'Estate Agent Automation',
      body: this.getMessageBodyWithFieldsReplaced(),
      attributes: JSON.stringify({ reapitSource: 'automation' }),
    })
    this.logInfo('Sent message', { twilioMessage })

    // add the conversation ID to the conversations table
    const now = new Date().toISOString()
    const itemToCreate = generateConversationItem({
      eventId: event.id,
      twilioConversationId: conversation.sid,
      createdAt: now,
      updatedAt: now,
    })
    const result = await db.put(itemToCreate)
    this.logInfo('Wrote item to the conversation table', { result })
  }
}
