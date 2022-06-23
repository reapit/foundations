import { ApiKeyModel } from './api-key-model'
import { ApiKeyExpiredException, ApiKeyNotFoundException } from './exceptions'
import AWS from 'aws-sdk'
import { plainToClass } from 'class-transformer'

const lambda = new AWS.Lambda()

interface ResolveApiKeyFunctionPropsInterface {
  apiKey: string,
  functionName: string,
}

/**
 * use lambda invoke to resolve apiKey and throw exceptions if key does not exist or is expired
 *
 * @param apiKeyHeader String
 * @returns GetApiKeyFunction
 */
export const resolveApiKey = async (
  {
    apiKey: apiKeyHeader,
    functionName: FunctionName,
  }: ResolveApiKeyFunctionPropsInterface,
): Promise<ApiKeyModel | never> => {
  const apiKey = await new Promise<ApiKeyModel | undefined>((resolve, reject) =>
    lambda.invoke(
      {
        FunctionName,
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({ apiKey: apiKeyHeader }),
      },
      (err, data) => {
        if (err) {
          console.log('cannot call api')
          console.error(err)
          reject(err)
        }
        resolve(data.Payload ? plainToClass(ApiKeyModel, JSON.parse(data.Payload.toString())) : undefined)
      },
    ),
  )

  if (!apiKey) {
    throw new ApiKeyNotFoundException()
  } else if (!apiKey.keyExpiresAt || (apiKey as ApiKeyModel).expired) {
    throw new ApiKeyExpiredException()
  }

  return apiKey
}
