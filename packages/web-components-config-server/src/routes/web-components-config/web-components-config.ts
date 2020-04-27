import express from 'express'
import { getConfigByClientId, createConfig, deleteConfig, updateConfig } from './api'
import { AppRequest, AppResponse } from '@/app'
import logger from '@/logger'
import { validateGetById, validateCreate, validateUpdate, validateDelete } from './validators'

const webComponentsConfig = express.Router()

export const webComponentsConfigGetByIdHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { customerId: req.params.customerId },
      traceId: req.traceId,
    }
    const { data } = params
    validateGetById(data)
    const result = await getConfigByClientId(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.getById', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigPutHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = { traceId: req.traceId, data: req.body }
    const { data } = params
    validateCreate(data)
    const result = await createConfig(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.put', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigPatchHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { customerId: req.params.customerId, ...req.body },
      traceId: req.traceId,
    }
    const { data } = params
    validateUpdate(data)
    const result = await updateConfig(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.patch', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

export const webComponentsConfigDeleteHandler = async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      data: { customerId: req.params.customerId },
      traceId: req.traceId,
    }
    const { data } = params
    validateDelete(data)
    const result = await deleteConfig(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.delete', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
}

webComponentsConfig.get('/:customerId', webComponentsConfigGetByIdHandler)
webComponentsConfig.put('/', webComponentsConfigPutHandler)
webComponentsConfig.patch('/:customerId', webComponentsConfigPatchHandler)
webComponentsConfig.delete('/:customerId', webComponentsConfigDeleteHandler)

export default webComponentsConfig
