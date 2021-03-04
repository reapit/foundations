import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { db } from '../../core/db'
import { generateAutomationItem } from '../../schemas/automation.schema'

export default async (req: AppRequest, res: Response) => {
  const id = req.params.id as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting automation by id...', { traceId, id })

    const itemToGet = generateAutomationItem({ id })
    const result = await db.get(itemToGet)

    if (result.clientCode !== (req as any).user.clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    res.status(200)
    return res.json(result)
  } catch (error) {
    logger.error('Error retrieving automation', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(200)
      return res.json({
        error: `Automation not found for ${id}`,
        code: 404,
      })
    }

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
