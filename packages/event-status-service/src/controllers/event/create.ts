import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import { db } from '../../core/db'
import { Automation, generateAutomationItem } from '../../schemas/automation.schema'
import { EventStatus, generateStatusItem } from '../../schemas/event-status.schema'

type Payload = {
  event: {
    id: string
    eventType: string
    createdAt: string
    clientCode: string
  }
}

// TODO: this endpoint should be protected so that only the events API can call it
export default async (req: AppRequest, res: Response) => {
  const payload = req.body as Payload
  const { traceId } = req

  try {
    logger.info('Create new event from webbook...', { traceId, payload })

    const now = new Date().toISOString()
    const DEFAULT_EVENT_STATUS = 'outstanding'

    // Create an event-status for this new event
    const itemToCreate = generateStatusItem({
      eventId: payload.event.id,
      clientCode: payload.event.clientCode,
      status: DEFAULT_EVENT_STATUS,
      eventCreatedAt: payload.event.createdAt,
      statusCreatedAt: now,
      statusUpdatedAt: now,
    })

    const newEventStatusItem = await db.put(itemToCreate, {
      condition: {
        type: 'And',
        conditions: [new FunctionExpression('attribute_not_exists', new AttributePath('eventId'))],
      },
    })

    logger.info('Created event-status successfully.', { traceId, newEventStatusItem })
    logger.info(
      `Searching for automation for clientCode: ${payload.event.clientCode} and eventType: ${payload.event.eventType}`,
      { traceId },
    )

    const automationItemToFind = generateAutomationItem({
      triggerOnEventType: payload.event.eventType,
      clientCode: payload.event.clientCode,
    })
    const existingAutomation = db.get(automationItemToFind)

    if (!existingAutomation) {
      logger.info('No automation found', { traceId })
      return res.status(201).json(newEventStatusItem)
    } else {
      // create twilio conversation with the contact in the event
      // send SMS with the body from the automation
      // add the conversation ID to the conversations table
    }
  } catch (error) {
    logger.error('Error creating new event from webhook', stringifyError(error))

    if (error.name === 'ConditionalCheckFailedException') {
      res.status(409)
      return res.json({
        error: `Conflict. Event with eventId ${payload.event.id} has already been received previously`,
        code: 409,
      })
    }

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
