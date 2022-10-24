import { LoginIdentity } from '@reapit/connect-session'
import { ApiKeyModel } from '@reapit/api-key-verify'

type LoginCredsType = {
  type: 'jwt'
} & LoginIdentity

type ApiKeyCredsType = {
  type: 'api-key'
} & Omit<ApiKeyModel, 'expired'>

export type CredsType = LoginCredsType | ApiKeyCredsType
