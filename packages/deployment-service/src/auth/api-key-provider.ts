import { Injectable, UnauthorizedException } from '@nestjs/common'
import { resolveApiKey } from '@reapit/api-key-verify/src'
import { Request } from 'express'

export type Credentials = {
  developerId: string
  clientId: string
}

@Injectable()
export class ApiKeyProvider {
  async resolve(request: Request): Promise<Credentials | never> {
    if (!request.headers['x-api-key'] || Array.isArray(request.headers['z-api-key'])) {
      throw new UnauthorizedException()
    }

    const apiKey = await resolveApiKey(
      request.headers['x-api-key'] as string,
      process.env.API_KEY_INVOKE_ARN?.includes('prod'),
    )

    return {
      developerId: apiKey?.developerId as string,
      clientId: apiKey?.clientCode as string,
    }
  }
}
