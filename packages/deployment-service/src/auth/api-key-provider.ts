import { Injectable, UnauthorizedException } from '@nestjs/common'
import { resolveApiKey } from '@reapit/api-key-verify'

export type Credentials = {
  developerId: string
  clientId: string
}

@Injectable()
export class ApiKeyProvider {
  async resolve(apiKey: string): Promise<Credentials | never> {
    if (!apiKey) {
      throw new UnauthorizedException()
    }

    const creds = await resolveApiKey(apiKey, process.env.API_KEY_INVOKE_ARN?.includes('prod'))

    return {
      developerId: creds?.developerId as string,
      clientId: creds?.clientCode as string,
    }
  }
}
