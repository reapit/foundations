import { selectAppDetailState, selectAppDetailData } from '../app-detail'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'
import { ReduxState } from '@/types/core'
import appState from '@/reducers/__stubs__/app-state'

describe('app-detail', () => {
  const mockState = {
    ...appState,
    apps: {
      detail: {
        data: appDetailDataStub.data,
        isLoading: false,
        errorMessage: '',
      },
    },
  } as ReduxState

  describe('selectAppDetailState', () => {
    it('should run correctly', () => {
      const result = selectAppDetailState(mockState)
      expect(result).toEqual(mockState.apps.detail)
    })
  })

  describe('selectAppDetailData', () => {
    it('should run correctly', () => {
      const result = selectAppDetailData(mockState)
      expect(result).toEqual(mockState.apps.detail.data)
    })
    it('should return {}', () => {
      const input = {} as ReduxState
      const result = selectAppDetailState(input)
      expect(result).toEqual(input)
    })
  })
})
