import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import { WebComponentConfigResult } from '@/services/web-component'

export const selectWebComponentData = (state: ReduxState): WebComponentConfigResult => {
  return state?.client.webComponent?.data
}

export const selectWebComponentLoading = (state: ReduxState): boolean => {
  return state?.client.webComponent?.loading
}

export const selectWebComponentUpdating = (state: ReduxState): boolean => {
  return state?.client.webComponent?.updating
}

export const selectWebComponentNegotiators = (state: ReduxState): NegotiatorModel[] => {
  return state?.client.webComponent?.negotiators?._embedded || []
}
