import dynamoDBMapper from '@/dynamodb-mapper'
import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import logger from '@/logger'
import { CreateParams, GetByOfficeIdParams } from '@/schemas/property-projector-config/api-types'
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

export const putConfig = async ({ traceId, data }): Promise<PropertyProjectorConfig> => {
  dynamoDBMapper.createTable(PropertyProjectorConfig, {readCapacityUnits: 5, writeCapacityUnits: 5})
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
