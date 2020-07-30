import { ReduxState } from '@/types/core'
import { selectApprovalListPageNumber } from '../approvals'
import appState from '@/reducers/__stubs__/app-state'
import { defaultState } from '@/reducers/apps/approvals'

describe('approvals', () => {
  const mockState = {
    ...appState,
    apps: {
      ...appState.apps,
      approvals: {
        ...defaultState,
        pageNumber: 10,
      },
    },
  } as ReduxState

  describe('selectApprovalListPageNumber', () => {
    it('should run correctly', () => {
      const result = selectApprovalListPageNumber(mockState)
      expect(result).toEqual({ pageNumber: 10 })
    })
    it('should run correctly and return {pageNumber: 1}', () => {
      const input = {} as ReduxState
      const result = selectApprovalListPageNumber(input)
      expect(result).toEqual({ pageNumber: 1 })
    })
  })
})
