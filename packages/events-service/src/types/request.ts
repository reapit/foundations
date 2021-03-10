import { Request } from 'express'

export interface ReqUser {
  sub: string
  clientCode: string
  userCode: string
  name: string
  email: string
}

export interface AppRequest extends Request {
  traceId?: string
  user?: ReqUser
}
