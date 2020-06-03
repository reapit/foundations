import { ReduxState } from '@/types/core'
import {
  selectAdminAppsState,
  selectAdminAppsData,
  selectAdminApprovalsState,
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
    adminApprovals: {
      loading: false,
      adminApprovalsData: approvalsStub,
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

  describe('selectAdminApprovalsState', () => {
    it('should run correctly', () => {
      const result = selectAdminApprovalsState(mockState)
      expect(result).toEqual(mockState.adminApprovals)
    })
    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAdminApprovalsState(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectWaitingApprovalData', () => {
    it('should run correctly', () => {
      const result = selectWaitingApprovalData(mockState)
      expect(result).toEqual(mockState.adminApprovals.adminApprovalsData?.data)
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
