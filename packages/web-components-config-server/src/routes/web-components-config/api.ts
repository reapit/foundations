import { AWSError } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client'
import docClient from '@/doc-client'
import logger from '@/logger'

export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type Config = {
  clientId: string
  clientWebsite: string
  configuration: {
    timeIntervalMinutes: number
    appointmentGapMinutes: number
    days: [] | [Day]
    months: [] | [Month]
    country: string
  }
}

const getTableName = () => `web-components-config-${process.env.APP_ENV}`

export const validateSchema = (item: Config): Config => {
  return {
    clientId: item.clientId,
    clientWebsite: item.clientWebsite,
    configuration: {
      timeIntervalMinutes: item?.configuration?.timeIntervalMinutes,
      appointmentGapMinutes: item?.configuration?.appointmentGapMinutes,
      days: item?.configuration?.days || [],
      months: item?.configuration?.months || [],
      country: item?.configuration?.country || '',
    },
  }
}

export type GetConfigByClientIdParams = {
  traceId: string
  clientId: string
}

export const getConfigByClientId = ({
  clientId,
  traceId,
}: GetConfigByClientIdParams): Promise<DocumentClient.GetItemOutput | AWSError> => {
  const params = {
    TableName: getTableName(),
    Key: {
      clientId,
    },
  } as DocumentClient.GetItemInput
  logger.info('Fetching Config By clientId', { traceId, clientId })
  return new Promise((resolve, reject) => {
    docClient.get(params, (error: AWSError, data: DocumentClient.GetItemOutput) => {
      if (error) {
        logger.error('Fetched Config By clientId Failed', { traceId, error: JSON.stringify(error) })
        return reject(error)
      }
      logger.info('Fetched Config By clientId Success', { traceId, item: data.Item })
      return resolve(data.Item)
    })
  })
}

export type GetConfigsParams = {
  traceId: string
}

export const getConfigs = ({ traceId }: GetConfigsParams): Promise<DocumentClient.GetItemOutput | AWSError> => {
  const tableName = getTableName()
  const params = {
    RequestItems: {
      [tableName]: {
        Keys: [],
      },
    },
  } as DocumentClient.BatchGetItemInput
  logger.info('Fetching Configs', { traceId })
  return new Promise((resolve, reject) => {
    docClient.batchGet(params, (error: AWSError, data: DocumentClient.BatchGetItemOutput) => {
      if (error) {
        logger.error('Fetched Configs Failed', { traceId, error: JSON.stringify(error) })
        return reject(error)
      }
      logger.info('Fetched Configs Success', { traceId, item: data.Responses })
      return resolve(data.Responses)
    })
  })
}

export type CreateConfigParams = {
  traceId: string
  item: Config
}

export const createConfig = ({ traceId, item }: CreateConfigParams): Promise<AWSError | Config> => {
  const params = {
    TableName: getTableName(),
    Item: validateSchema(item),
    ReturnValues: 'ALL_OLD',
  } as DocumentClient.PutItemInput
  logger.info('Creating Config', { traceId, item })
  return new Promise((resolve, reject) => {
    docClient.put(params, (error: AWSError, data: DocumentClient.PutItemOutput) => {
      if (error) {
        logger.error('Created Config Failed', { traceId, error: JSON.stringify(error) })
        return reject(error)
      }
      logger.info('Created Config Success', { traceId, item })
      return resolve((data.Attributes as Config) || (item as Config))
    })
  })
}

export type UpdateConfigParams = {
  traceId: string
  clientId: string
  item: Pick<Config, Exclude<keyof Config, 'clientId'>>
}

export const updateConfig = ({ traceId, clientId, item }: UpdateConfigParams): Promise<AWSError | Config> => {
  const params = {
    TableName: getTableName(),
    Key: {
      clientId,
    },
    ConditionExpression: 'clientId = :clientId',
    ExpressionAttributeValues: {
      ':clientId': clientId,
    },
    AttributeUpdates: {
      ...validateSchema(item as Config),
    },
    ReturnValues: 'ALL_NEW',
  } as DocumentClient.UpdateItemInput
  logger.info('Updating Config', { traceId, item })
  return new Promise((resolve, reject) => {
    docClient.update(params, (error: AWSError, data: DocumentClient.UpdateItemOutput) => {
      if (error) {
        logger.error('Updated Config Failed', { traceId, error: JSON.stringify(error) })
        return reject(error)
      }
      logger.info('Updated Config Success', { traceId, item })
      return resolve(data.Attributes as Config)
    })
  })
}

export type DeleteConfigParams = {
  traceId: string
  clientId: string
}

export const deleteConfig = ({ traceId, clientId }: DeleteConfigParams): Promise<AWSError | Config> => {
  const params = {
    TableName: getTableName(),
    Key: {
      clientId,
    },
    ConditionExpression: 'clientId = :clientId',
    ExpressionAttributeValues: {
      ':clientId': clientId,
    },
    ReturnValues: 'ALL_OLD',
  } as DocumentClient.DeleteItemInput
  logger.info('Deleting Config', { traceId, params })
  return new Promise((resolve, reject) => {
    docClient.delete(params, (error: AWSError, data: DocumentClient.DeleteItemOutput) => {
      if (error) {
        logger.error('Deleted Config Failed', { traceId, error: JSON.stringify(error) })
        return reject(error)
      }
      logger.info('Deleted Config Success', { traceId, clientId })
      return resolve(data.Attributes as Config)
    })
  })
}
