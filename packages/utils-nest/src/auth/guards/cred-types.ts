import { LoginIdentity } from '@reapit/connect-session-server'
import { ApiKeyInterface } from '@reapit/foundations-ts-definitions'

type LoginCredsType = {
  type: 'jwt'
} & LoginIdentity

type ApiKeyCredsType = {
  type: 'api-key'
} & ApiKeyInterface

export type CredsType = LoginCredsType | ApiKeyCredsType
