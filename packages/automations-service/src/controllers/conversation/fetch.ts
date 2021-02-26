import twilio from 'twilio'
import { map } from 'awaity'
import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'

interface Conversation {
  sid: string
}

export default async (req: AppRequest, res: Response) => {
  const { traceId } = req

  try {
    logger.info('List conversations...', { traceId })

    // TODO: move this to config
    const accountSid = 'ACc6ef024a3a76ff03dbe9e15b27d5daa6'
    const authToken = '0198acb81f7006dd5a95f2a8ec67b1f3'
    const client = twilio(accountSid, authToken)

    // TODO: this has to be scoped to an agent, a client, an office or similar?
    const conversations = await client.conversations.conversations.list({ limit: 20 })

    logger.info('Got conversations', { conversations })

    const decoratedConversations = await map(conversations, async (conversation: Conversation) => {
      const messages = await client.conversations.conversations(conversation.sid).messages.list({ limit: 10 })
      if (!messages || !messages.length) return conversation
      return Object.assign(conversation, { messages })
    })

    return res.json(decoratedConversations)
  } catch (error) {
    logger.error('Error fetching conversations with messages', stringifyError(error))

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
