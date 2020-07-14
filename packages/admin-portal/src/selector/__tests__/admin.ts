import { ReduxState } from '@/types/core'
import {
  selectAdminAppsState,
  selectAdminAppsData,
  selectApprovalsState,
  selectWaitingApprovalData,
  selectAdminStats,
  selectAdminDevManagement,
} from '../admin'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { approvalsStub } from '@/sagas/__stubs__/approvals'
import appState from '@/reducers/__stubs__/app-state'

describe('admin', () => {
  const mockState = {
    ...appState,
    adminApps: {
      adminAppsData: appsDataStub.data,
      loading: false,
    },
    approvals: {
      loading: false,
      approvalsData: approvalsStub,
    },
  } as ReduxState

  describe('selectAdminAppsState', () => {
    it('should run correctly', () => {
      const result = selectAdminAppsState(mockState)
      expect(result).toEqual({ adminAppsData: appsDataStub.data, loading: false })
    })

    it('should run correctly and return {}', () => {
      const input = {} as ReduxState
      const result = selectAdminAppsState(input)
      expect(result).toEqual({})
    })
  })

  describe('selectAdminAppsData', () => {
    it('should run correctly', () => {
      const result = selectAdminAppsData(mockState)
      expect(result).toEqual(mockState.adminApps.adminAppsData)
    })
    it('should run correctly and return {}', () => {
      const input = {} as ReduxState
      const result = selectAdminAppsState(input)
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
  describe('selectAdminStats', () => {
    it('should run correctly', () => {
      const result = selectAdminStats(mockState)
      expect(result).toEqual(mockState.adminStats)
    })
  })

  describe('selectAdminDevManagement', () => {
    it('should run correctly', () => {
      const result = selectAdminDevManagement(mockState)
      expect(result).toEqual(appState.adminDevManagement)
    })
  })
})
