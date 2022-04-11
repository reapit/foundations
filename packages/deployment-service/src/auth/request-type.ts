import { LoginIdentity } from '@reapit/connect-session/src'
import { Request as ExpressRequest } from 'express'
import { Credentials } from './api-key-provider'

export interface AuthenticatedRequest extends ExpressRequest {
  user: LoginIdentity | Credentials
}
