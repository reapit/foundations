import { UpdateNegotiatorModel } from '@reapit/foundations-ts-definitions'

export type GetNegotiatorByIdArgs = {
  id: string
}

export type UpdateNegotiatorArgs = {
  id: string
} & UpdateNegotiatorModel
