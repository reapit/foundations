import { Request } from 'express'

export interface AppRequest extends Request {
  user?: {
    sub: string
    clientCode: string
    userCode: string
    name: string
    email: string
  }
}
