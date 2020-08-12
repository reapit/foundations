import { ReduxState } from '@/types/core'
import { selectSettingsPageIsLoading } from '../settings'
import appState from '@/reducers/__stubs__/app-state'

describe('settings selectors', () => {
  const mockState = {
    ...appState,
    settings: {
      loading: true,
    },
  } as ReduxState

  describe('selectSettingsPageIsLoading', () => {
    it('should run correctly', () => {
      const result = selectSettingsPageIsLoading(mockState)
      expect(result).toEqual(true)
    })

    it('return false when redux state is empty', () => {
      const input = {} as ReduxState
      const result = selectSettingsPageIsLoading(input)
      expect(result).toEqual(false)
    })
  })
})
