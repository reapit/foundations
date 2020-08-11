import dynamoDBMapper from '@/dynamodb-mapper'
import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import logger from '@/logger'
import { CreateParams, DeleteParams, UpdateParams, GetByOfficeIdParams } from '@/schemas/property-projector-config/projector-api-types'
import { PropertyProjectorConfig } from '@/schemas/property-projector-config/schema'
import { generateSchemaItem } from '@/schemas/property-projector-config/utils'
import { stringifyError } from '@reapit/node-utils'

export const getConfigByOfficeId = async ({ traceId, data }: GetByOfficeIdParams): Promise<PropertyProjectorConfig> => {
  try {
    logger.info('Getting config by officeId...', { traceId, data })
    const itemToGet = generateSchemaItem(data)
    const result = await dynamoDBMapper.get(itemToGet)
    logger.info('Get config by officeId successfully', { traceId, result })
    return result
  } catch (error) {
    await logger.error('Get config by officeId failed', { traceId, error: stringifyError(error) })
    throw error
  }
}

export const createConfig = async ({ traceId, data }: CreateParams): Promise<PropertyProjectorConfig> => {
  try {
    const itemToCreate = generateSchemaItem(data)
    const result = await dynamoDBMapper.put(itemToCreate, {
      condition: {
        type: 'And',
        conditions: [
          new FunctionExpression('attribute_not_exists', new AttributePath('customerId')),
          new FunctionExpression('attribute_not_exists', new AttributePath('officeId')),
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

export const patchConfig = async ({ traceId, data }: UpdateParams): Promise<PropertyProjectorConfig> => {
  try {
    logger.info('Patching config...', { traceId, data })
    const { customerId, officeId, ...rest } = data
    const oldItem = await getConfigByOfficeId({ traceId, data: { customerId, officeId } })
    const itemToUpdate = generateSchemaItem({ ...oldItem, ...rest })
    const result = await dynamoDBMapper.update(itemToUpdate)
    logger.info('Patch config successfully', { traceId, result })
    return result
  } catch (error) {
    await logger.error('Patch config failed', { traceId, error: stringifyError(error) })
    throw error
  }
}

export const putConfig = async ({ traceId, data }): Promise<PropertyProjectorConfig> => {
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

export const deleteConfig = async ({ traceId, data }: DeleteParams): Promise<PropertyProjectorConfig> => {
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
