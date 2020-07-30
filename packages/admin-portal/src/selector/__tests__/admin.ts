import { ReduxState } from '@/types/core'
import { selectApprovalListState, selectStatistics, selectDeveloperListState } from '../admin'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'
import appState from '@/reducers/__stubs__/app-state'
import { defaultState } from '@/reducers/approvals'

describe('admin', () => {
  const mockState = {
    ...appState,
    appsManagement: {
      appsData: appsDataStub.data,
      loading: false,
    },
    approvals: defaultState,
  } as ReduxState

  describe('selectApprovalListState', () => {
    it('should run correctly', () => {
      const result = selectApprovalListState(mockState)
      expect(result).toEqual(mockState.approvals.list)
    })
    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectApprovalListState(input)
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
