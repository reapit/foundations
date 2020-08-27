import express from 'express'
import { getConfigByOfficeId, putConfig } from './api'
import { AppRequest, AppResponse } from '@/app'
import logger from '@/logger'
import { validateGetById, validateCreate } from './validators'
import { stringifyError } from '@reapit/node-utils'

const propertyProjectorConfig = express.Router()

export const propertyProjectorConfigGetByIdHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { customerId: req.params.customerId, officeId: req.params.officeId },
      traceId: req.traceId,
    }
    const { data } = params

    validateGetById(data)
    const result = await getConfigByOfficeId(params)
    return res.send(result)
  } catch (err) {
    await logger.error('propertyProjectorConfig.getById', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const propertyProjectorConfigPutHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { ...req.body, customerId: req.params.customerId, officeId: req.params.officeId },
      traceId: req.traceId,
    }
    const { data } = params
    validateCreate(data)
    const result = await putConfig(params)

    return res.send(result)
  } catch (err) {
    await logger.error('propertyProjectorConfig.patch', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })

    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

propertyProjectorConfig
  .route('/:customerId/:officeId')
  .get(propertyProjectorConfigGetByIdHandler)
  .put(propertyProjectorConfigPutHandler)

export default propertyProjectorConfig
