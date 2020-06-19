import dynamoDBMapper from '@/dynamodb-mapper'
import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import logger from '@/logger'
import { CreateParams, DeleteParams, UpdateParams, GetByClientIdParams } from '@/schemas/api-types'
import { WebComponentConfig } from '@/schemas/schema'
import { generateSchemaItem } from '@/schemas/utils'
import { stringifyError } from '@reapit/node-utils'

export const getConfigByClientId = async ({ traceId, data }: GetByClientIdParams): Promise<WebComponentConfig> => {
  try {
    logger.info('Getting config by customerId...', { traceId, data })
    const itemToGet = generateSchemaItem(data)
    const result = await dynamoDBMapper.get(itemToGet)
    logger.info('Get config by customerId successfully', { traceId, result })
    return result
  } catch (error) {
    await logger.error('Get config by customerId failed', { traceId, error: stringifyError(error) })
    throw error
  }
}

export const createConfig = async ({ traceId, data }: CreateParams): Promise<WebComponentConfig> => {
  try {
    const itemToCreate = generateSchemaItem(data)
    const result = await dynamoDBMapper.put(itemToCreate, {
      condition: {
        type: 'And',
        conditions: [
          new FunctionExpression('attribute_not_exists', new AttributePath('customerId')),
          new FunctionExpression('attribute_not_exists', new AttributePath('appId')),
        ],
      },
    })
    logger.info('Create config successfully', { traceId, result })
    return result
  } catch (error) {
    await logger.error('Create config failed', { traceId, error: stringifyError(error) })
    throw error
  }
}

export const patchConfig = async ({ traceId, data }: UpdateParams): Promise<WebComponentConfig> => {
  try {
    logger.info('Patching config...', { traceId, data })
    const { customerId, appId, ...rest } = data
    const oldItem = await getConfigByClientId({ traceId, data: { customerId, appId } })
    const itemToUpdate = generateSchemaItem({ ...oldItem, ...rest })
    const result = await dynamoDBMapper.update(itemToUpdate)
    logger.info('Patch config successfully', { traceId, result })
    return result
  } catch (error) {
    await logger.error('Patch config failed', { traceId, error: stringifyError(error) })
    throw error
  }
}

export const putConfig = async ({ traceId, data }): Promise<WebComponentConfig> => {
  try {
    logger.info('Updating config...', { traceId, data })
    const itemToUpdate = generateSchemaItem(data)
    const result = await dynamoDBMapper.put(itemToUpdate)
    logger.info('Update config successfully', { traceId, result })
    return result
  } catch (error) {
    await logger.error('Update config failed', { traceId, error: stringifyError(error) })
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
    await logger.error('Delete config failed', { traceId, error: stringifyError(error) })
    throw error
  }
}
