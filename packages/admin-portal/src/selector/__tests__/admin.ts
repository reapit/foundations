import { ReduxState } from '@/types/core'
import {
  selectAppsManagementState,
  selectAppsData,
  selectApprovalsState,
  selectWaitingApprovalData,
  selectStatistics,
  selectDevsManagement,
} from '../admin'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { approvalsStub } from '@/sagas/__stubs__/approvals'
import appState from '@/reducers/__stubs__/app-state'

describe('admin', () => {
  const mockState = {
    ...appState,
    appsManagement: {
      appsData: appsDataStub.data,
      loading: false,
    },
    approvals: {
      loading: false,
      approvalsData: approvalsStub,
    },
  } as ReduxState

  describe('selectAppsManagementState', () => {
    it('should run correctly', () => {
      const result = selectAppsManagementState(mockState)
      expect(result).toEqual({ appsData: appsDataStub.data, loading: false })
    })

    it('should run correctly and return {}', () => {
      const input = {} as ReduxState
      const result = selectAppsManagementState(input)
      expect(result).toEqual({})
    })
  })

  describe('selectAppsData', () => {
    it('should run correctly', () => {
      const result = selectAppsData(mockState)
      expect(result).toEqual(mockState.appsManagement.appsData)
    })
    it('should run correctly and return {}', () => {
      const input = {} as ReduxState
      const result = selectAppsManagementState(input)
      expect(result).toEqual({})
    })
  })

  describe('selectApprovalsState', () => {
    it('should run correctly', () => {
      const result = selectApprovalsState(mockState)
      expect(result).toEqual(mockState.approvals)
    })
    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectApprovalsState(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectWaitingApprovalData', () => {
    it('should run correctly', () => {
      const result = selectWaitingApprovalData(mockState)
      expect(result).toEqual(mockState.approvals.approvalsData?.data)
    })
    it('should run correctly and return {}', () => {
      const input = {} as ReduxState
      const result = selectWaitingApprovalData(input)
      expect(result).toEqual({})
    })
  })
  describe('selectStatistics', () => {
    it('should run correctly', () => {
      const result = selectStatistics(mockState)
      expect(result).toEqual(mockState.statistics)
    })
  })

  describe('selectDevsManagement', () => {
    it('should run correctly', () => {
      const result = selectDevsManagement(mockState)
      expect(result).toEqual(appState.devsManagement)
    })
  })
})
