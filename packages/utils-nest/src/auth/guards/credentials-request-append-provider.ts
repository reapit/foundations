import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { CredsType } from './cred-types'

@Injectable()
export class CredentialsRequestAppendProvider {
  appendCredsToRequest(request: Request & { credentials?: CredsType }, credentials, type?: string): void {
    request.credentials = {
      ...credentials,
      type,
    }
  }
}
