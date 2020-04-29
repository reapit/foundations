import dynamoDBMapper from '@/dynamodb-mapper'
import logger from '@/logger'
import { CreateParams, DeleteParams, UpdateParams, GetByClientIdParams } from '@/schemas/api-types'
import { WebComponentConfig } from '@/schemas/schema'
import { generateSchemaItem } from '@/schemas/utils'

export const getConfigByClientId = async ({ traceId, data }: GetByClientIdParams): Promise<WebComponentConfig> => {
  try {
    logger.info('Getting config by customerId...', { traceId, data })
    const itemToGet = generateSchemaItem(data)
    const result = await dynamoDBMapper.get(itemToGet)
    logger.info('Get config by customerId successfully', { traceId, result })
    return result
  } catch (error) {
    logger.error('Get config by customerId failed', { traceId, error: JSON.stringify(error) })
    throw error
  }
}

export const createConfig = async ({ traceId, data }: CreateParams): Promise<WebComponentConfig> => {
  try {
    logger.info('Creating config...', { traceId, data })
    const itemToCreate = generateSchemaItem(data)
    const result = await dynamoDBMapper.put(itemToCreate)
    logger.info('Create config successfully', { traceId, result })
    return result
  } catch (error) {
    logger.error('Create config failed', { traceId, error: JSON.stringify(error) })
    throw error
  }
}

export const updateConfig = async ({ traceId, data }: UpdateParams): Promise<WebComponentConfig> => {
  try {
    logger.info('Updating config...', { traceId, data })
    const { customerId, ...rest } = data
    const oldItem = await getConfigByClientId({ traceId, data: { customerId } })
    const itemToUpdate = generateSchemaItem({ ...oldItem, ...rest })
    const result = await dynamoDBMapper.update(itemToUpdate)
    logger.info('Update config successfully', { traceId, result })
    return result
  } catch (error) {
    logger.error('Update config failed', { traceId, error: JSON.stringify(error) })
    throw error
  }
}

export const deleteConfig = async ({ traceId, data }: DeleteParams): Promise<WebComponentConfig> => {
  try {
    logger.info('Deleting config...', { traceId, data })
    const itemToDelete = generateSchemaItem(data)
    const result = await dynamoDBMapper.delete(itemToDelete)
    logger.info('Delete config successfully', { traceId, result })
    return result
  } catch (error) {
    logger.error('Delete config failed', { traceId, error: JSON.stringify(error) })
    throw error
  }
}
