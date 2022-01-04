import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/utils-node'
import { FunctionExpression, AttributePath, equals } from '@aws/dynamodb-expressions'
import { db } from '../../core/db'
import { Automation } from '../../schemas/automation.schema'
import { generateStatusItem } from '../../schemas/event-status.schema'
import { AutomationExecution } from '../../services/automation-execution'
import { Event } from '../../types/event'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

type Payload = {
  event: Event
}

const writeNewEventStatus = async (event: Event) => {
  const now = new Date().toISOString()
  const DEFAULT_EVENT_STATUS = 'outstanding'

  // Create an event-status for this new event
  const itemToCreate = generateStatusItem({
    eventId: event.id,
    clientCode: event.customerId,
    status: DEFAULT_EVENT_STATUS,
    eventCreatedAt: event.published,
    statusCreatedAt: now,
    statusUpdatedAt: now,
  })

  return await db.put(itemToCreate, {
    condition: {
      type: 'And',
      conditions: [new FunctionExpression('attribute_not_exists', new AttributePath('eventId'))],
    },
  })
}

const findRelevantAutomation = async (event: Event) => {
  // find automations where the clientCode and triggerOnEventType matches the event
  const keyCondition = { clientCode: event.customerId }
  const queryConditons = {
    indexName: 'AutomationsByClientCode',
    filter: {
      subject: 'triggerOnEventType',
      ...equals(event.type),
    },
  }
  const iterator = db.query(Automation, keyCondition, queryConditons)
  const automations = []
  for await (const record of iterator) automations.push(record)

  // if there are multiple automations set for this client and eventType, just run the first one for now
  if (automations.length > 0) return automations[0]
  return false
}

// TODO: this endpoint should be protected so that only the events API can call it
export default async (req: AppRequest, res: Response) => {
  const payload = req.body as Payload
  const { traceId } = req
  const { event } = payload

  try {
    const newEventStatusItem = await writeNewEventStatus(event)
    logger.info(`Search for automation: clientCode: ${event.customerId}, eventType: ${event.type}`, {
      traceId,
      newEventStatusItem,
    })
    const automation = await findRelevantAutomation(event)

    if (!automation) {
      logger.info('No automation found', { traceId })
      return res.json({ OK: 1 })
    }

    logger.info('Automation found', { traceId, automation })
    await new AutomationExecution(event, automation, traceId).execute()

    return res.json({ OK: 1 })
  } catch (error) {
    logger.error('Error creating new event from webhook', stringifyError(error))

    if (error.name === 'ConditionalCheckFailedException') {
      const msg = `Conflict. Event with eventId ${event.id} has already been received previously`
      logger.error(msg, { traceId })
      return res.status(HttpStatusCodeEnum.CONFLICT).json({ error: msg, code: HttpStatusCodeEnum.CONFLICT })
    }

    res.status(HttpStatusCodeEnum.BAD_REQUEST)
    res.json({
      error: `Bad request ${error}`,
      code: HttpStatusCodeEnum.BAD_REQUEST,
    })
  }
}
