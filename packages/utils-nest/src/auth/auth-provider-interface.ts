import { LoginIdentity } from '@reapit/connect-session'
import { Request } from 'express'

export interface AuthProviderInterface<T extends any> {
  applies(request: Request): boolean
  resolve(request: Request): Promise<LoginIdentity | T>
  type(): string
}
