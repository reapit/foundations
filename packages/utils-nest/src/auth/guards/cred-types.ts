import { LoginIdentity } from '@reapit/connect-session'

type LoginCredsType = {
  type: 'jwt'
} & LoginIdentity

export type CredsType = LoginCredsType
