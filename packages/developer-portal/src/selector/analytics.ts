import { ReduxState } from '@/types/core'

export const getAppHttpTraffic = (state: ReduxState) => {
  return state.appHttpTraffic
}
