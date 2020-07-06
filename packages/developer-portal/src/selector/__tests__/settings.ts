import { ReduxState } from '@/types/core'
import { selectSettingsPageIsLoading, selectSettingsPageDeveloperInformation } from '../settings'
import appState from '@/reducers/__stubs__/app-state'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('settings selectors', () => {
  const mockState = {
    ...appState,
    settings: {
      developerInfomation: developerStub,
      loading: true,
    },
  } as ReduxState

  describe('selectSettingsPageDeveloperInformation', () => {
    it('should run correctly', () => {
      const result = selectSettingsPageDeveloperInformation(mockState)
      expect(result).toEqual(developerStub)
    })

    it('return empty object when redux state is empty', () => {
      const input = {} as ReduxState
      const result = selectSettingsPageDeveloperInformation(input)
      expect(result).toEqual({})
    })
  })

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
