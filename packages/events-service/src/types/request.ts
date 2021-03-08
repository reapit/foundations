import { Request } from 'express'

export interface AppRequest extends Request {
  traceId?: string
  user?: {
    sub: string
    clientCode: string
    userCode: string
    name: string
    email: string
  }
}
