import express from 'express'
import {
  getConfigByClientId,
  createConfig,
  getConfigs,
  deleteConfig,
  updateConfig,
  GetConfigsParams,
  GetConfigByClientIdParams,
  CreateConfigParams,
  UpdateConfigParams,
  DeleteConfigParams,
} from './api'
import { AppRequest, AppResponse } from '@/app'
import logger from '@/logger'

const webComponentsConfig = express.Router()

webComponentsConfig.get('/:clientId', async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      clientId: req.params.clientId,
      traceId: req.traceId,
    } as GetConfigByClientIdParams
    const result = await getConfigByClientId(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.getById', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
})

webComponentsConfig.get('/', async (req: AppRequest, res: AppResponse) => {
  try {
    const params = { traceId: req.traceId } as GetConfigsParams
    const result = await getConfigs(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.get', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
})

webComponentsConfig.post('/', async (req: AppRequest, res: AppResponse) => {
  try {
    const params = { traceId: req.traceId, item: req.body } as CreateConfigParams
    const result = await createConfig(params)
    console.log(result)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.post', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
})

webComponentsConfig.patch('/:clientId', async (req: AppRequest, res: AppResponse) => {
  try {
    delete req.body.clientId
    const params = {
      clientId: req.params.clientId,
      item: req.body,
      traceId: req.traceId,
    } as UpdateConfigParams
    const result = await updateConfig(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.patch', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
})

webComponentsConfig.delete('/:clientId', async (req: AppRequest, res: AppResponse) => {
  try {
    const params = {
      clientId: req.params.clientId,
      traceId: req.traceId,
    } as DeleteConfigParams
    const result = await deleteConfig(params)
    return res.send(result)
  } catch (err) {
    logger.error('webComponentsConfig.delete', { traceId: req.traceId, error: JSON.stringify(err) })
    return res.send({ message: err.message, code: err.code, traceId: req.traceId })
  }
})

export default webComponentsConfig
