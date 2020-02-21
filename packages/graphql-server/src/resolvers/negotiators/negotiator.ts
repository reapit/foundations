import { UpdateNegotiatorModel } from '@reapit/foundations-ts-definitions'

export type GetNegotiatorByIdArgs = {
  id: string
}

export type UpdateNegotiatorArgs = {
  id: string
  name?: string
  jobTitle?: string
  active?: boolean
  workPhone?: string
  mobilePhone?: string
  email?: string
  metadata?: {
    [name: string]: any
  }
}
