import { NestFactory } from '@nestjs/core'
import { ApiKeyModule } from './api-keys'
import { ApiKeyProvider } from './api-keys/api-key-provider'

export const invokeAPiKeyVerify = async ({ apiKey: apiKeyHeader }: { apiKey?: string }) => {
  const app = await NestFactory.createApplicationContext(ApiKeyModule)

  await app.init()

  const apiKeyProvider = app.get<ApiKeyProvider>(ApiKeyProvider)

  if (!apiKeyHeader) {
    return undefined
  }

  return apiKeyProvider.getApiKeyByKey(apiKeyHeader)
}
