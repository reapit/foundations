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
  twilioClient: Twilio

  constructor(event: Event, automation: Automation, traceId: string) {
    this.event = event
    this.automation = automation
    this.traceId = traceId
    this.twilioClient = twilio(TWILIO.accountId, TWILIO.authToken)
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
    const { twilioClient, event, automation } = this

    // create twilio conversation with the contact in the event
    const conversation = await twilioClient.conversations.conversations.create({
      friendlyName: `Conversation with ${event.object.mobilePhone}, from automation ${automation.id}`,
    })
    this.logInfo('Created conversation', { conversation })

    const addParticipantToConversation = async () =>
      await twilioClient.conversations.conversations(conversation.sid).participants.create({
        messagingBinding: {
          address: event.object.mobilePhone,
          // TODO: this will probably need to be one Twilio phone number per agent, or maybe even per
          // property or something? The limitiation is that an SMS user can only be part of one
          // conversation with a twilio number at any one time. It'll also need to come from config...
          proxyAddress: '+447481346105',
        },
      })

    try {
      const participant = await addParticipantToConversation()
      this.logInfo('Added participant', { participant })
    } catch (error) {
      if (error.code === 50416 && event.isTestEvent) {
        // A binding for this participant and proxy address already exists in another conversation
        // - https://www.twilio.com/docs/errors/50416
        // This means the real phone number to send the SMS to has already been
        // sent an SMS from the same proxyAddress and has an active conversation.
        // They need to be removed from the previous conversation
        this.logInfo(
          'Could not add participant because they are already part of another conversation wiht this proxyAddress. The participant will first be removed from that other conversation.',
        )
        const match = error.message.match(/(CH[a-zA-Z0-9]*)/)
        if (!match || !match.length)
          throw new Error(
            'A binding for this participant and proxy address already exists in another conversation. However, could not find the conversation they were a part of.',
          )
        const conversationSid = match[0]
        const participants = await twilioClient.conversations.conversations(conversationSid).participants.list()
        const participantToRemove = participants.find((p) => p.messagingBinding.address === event.object.mobilePhone)
          .sid
        await twilioClient.conversations.conversations(conversationSid).participants(participantToRemove).remove()
        this.logInfo(`Removed participant ${participantToRemove} from conversation ${conversationSid}`)

        // try and re-add them to the conversation...
        const participant = await addParticipantToConversation()
        this.logInfo('Added participant', { participant })
      } else {
        throw error
      }
    }

    // send SMS with the body from the automation
    const twilioMessage = await twilioClient.conversations.conversations(conversation.sid).messages.create({
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
