import twilio from 'twilio'
import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'

type Payload = {
  telephoneNumber: string
  automatedMessage: string
}

export default async (req: AppRequest, res: Response) => {
  const payload = req.body as Payload
  const { telephoneNumber, automatedMessage } = payload
  const { traceId } = req

  try {
    logger.info('Create a conversation...', { traceId, payload })

    // TODO: move this to config
    const accountSid = 'ACc6ef024a3a76ff03dbe9e15b27d5daa6'
    const authToken = '0198acb81f7006dd5a95f2a8ec67b1f3'
    const client = twilio(accountSid, authToken)

    const conversation = await client.conversations.conversations.create({
      friendlyName: `Conversation with ${telephoneNumber}`,
    })

    logger.info('Started conversation', { conversation })

    const participant = await client.conversations.conversations(conversation.sid).participants.create({
      messagingBinding: {
        address: telephoneNumber,
        proxyAddress: '+447481346105', // this will probably need to be one Twilio phone number per agent, or maybe even per property or something? The limitiation is that an SMS user can only be part of one conversation with a twilio number at any one time
      },
    })

    logger.info('Added participant', { participant })

    const message = await client.conversations.conversations(conversation.sid).messages.create({
      author: 'Estate Agent Automation',
      body: automatedMessage,
      attributes: JSON.stringify({ reapitSource: 'automations-service' }),
    })

    logger.info('Sent message', { message })

    res.status(201)
    return res.json({ messageSent: true, messageSentTo: telephoneNumber, messageBody: automatedMessage })
  } catch (error) {
    logger.error('Error creating conversation', stringifyError(error))

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
