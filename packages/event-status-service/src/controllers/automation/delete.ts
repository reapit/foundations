import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { generateAutomationItem } from '../../schemas/automation.schema'

export default async (req: AppRequest, res: Response) => {
  const id = req.params.id as string | undefined
  const { traceId } = req

  try {
    logger.info('Deleting automation by id...', { traceId, id })

    const item = generateAutomationItem({ id })
    const result = await db.get(item)

    if (result.clientCode !== req.user?.clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    await db.delete(item)

    return res.status(204).send()
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
