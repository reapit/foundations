import express from 'express'
import { getConfigByClientId, createConfig, deleteConfig, patchConfig, putConfig } from './api'
import { AppRequest, AppResponse } from '@/app'
import logger from '@/logger'
import { validateGetById, validateCreate, validatePatch, validateDelete } from './validators'
import { stringifyError } from '@reapit/node-utils'

const webComponentsConfig = express.Router()

export const webComponentsConfigGetByIdHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { customerId: req.params.customerId, appId: req.params.appId },
      traceId: req.traceId,
    }
    const { data } = params

    validateGetById(data)
    const result = await getConfigByClientId(params)
    return res.send(result)
  } catch (err) {
    await logger.error('webComponentsConfig.getById', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigPatchHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { ...req.body, customerId: req.params.customerId, appId: req.params.appId },
      traceId: req.traceId,
    }
    const { data } = params
    validatePatch(data)
    const result = await patchConfig(params)
    return res.send(result)
  } catch (err) {
    await logger.error('webComponentsConfig.patch', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigPutHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { ...req.body, customerId: req.params.customerId, appId: req.params.appId },
      traceId: req.traceId,
    }
    const { data } = params
    validateCreate(data)
    const result = await putConfig(params)

    return res.send(result)
  } catch (err) {
    await logger.error('webComponentsConfig.patch', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })

    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigDeleteHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { customerId: req.params.customerId, appId: req.params.appId },
      traceId: req.traceId,
    }
    const { data } = params
    validateDelete(data)
    const result = await deleteConfig(params)
    return res.send(result)
  } catch (err) {
    await logger.error('webComponentsConfig.delete', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigPostHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { ...req.body, customerId: req.params.customerId, appId: req.params.appId },
      traceId: req.traceId,
    }
    const { data } = params

    validateCreate(data)
    const result = await createConfig(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.create', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

webComponentsConfig.post('/:customerId/:appId', webComponentsConfigPostHandler)
webComponentsConfig.get('/:customerId/:appId', webComponentsConfigGetByIdHandler)
webComponentsConfig.delete('/:customerId/:appId', webComponentsConfigDeleteHandler)
webComponentsConfig.put('/:customerId/:appId', webComponentsConfigPutHandler)
webComponentsConfig.patch('/:customerId/:appId', webComponentsConfigPatchHandler)

export default webComponentsConfig
