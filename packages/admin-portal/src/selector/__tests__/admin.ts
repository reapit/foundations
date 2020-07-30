import { ReduxState } from '@/types/core'
import { selectApprovals, selectStatistics, selectDeveloperListState } from '../admin'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'
import appState from '@/reducers/__stubs__/app-state'
import { defaultState } from '@/reducers/apps/approvals'

describe('admin', () => {
  const mockState = {
    ...appState,
    appsManagement: {
      appsData: appsDataStub.data,
      loading: false,
    },
    approvals: defaultState,
  } as ReduxState

  describe('selectApprovals', () => {
    it('should run correctly', () => {
      const result = selectApprovals(mockState)
      expect(result).toEqual(mockState.apps.approvals)
    })
    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectApprovals(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectStatistics', () => {
    it('should run correctly', () => {
      const result = selectStatistics(mockState)
      expect(result).toEqual(mockState.statistics)
    })
  })

  describe('selectDeveloperListState', () => {
    it('should run correctly', () => {
      const result = selectDeveloperListState(mockState)
      expect(result).toEqual(appState.developers.list)
    })
  })
})
