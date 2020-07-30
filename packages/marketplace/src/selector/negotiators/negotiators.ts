import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'

export const selectNegotiators = (state: ReduxState): NegotiatorModel[] => {
  return state?.negotiators?.list?.data || []
}
