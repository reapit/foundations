import appState from '@/reducers/__stubs__/app-state'
import { ReduxState } from '@/types/core'
import { selectNegotiators } from '../negotiators'

describe('negotiators', () => {
  describe('selectNegotiators', () => {
    it('should run correctly', () => {
      expect(selectNegotiators(appState)).toEqual(appState.negotiators.list.data)
    })
    it('should return []', () => {
      expect(selectNegotiators({} as ReduxState)).toEqual([])
    })
  })
})
