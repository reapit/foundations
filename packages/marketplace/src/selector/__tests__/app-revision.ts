import { ReduxState } from '@/types/core'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'
import { selectAppRevision, selectAppRevisions, selectAppRevisionDetail } from '../app-revisions'
import appState from '@/reducers/__stubs__/app-state'

describe('app-revision', () => {
  const mockState = {
    ...appState,
    revisionDetail: {
      revisionDetailData: {
        data: revisionsDataStub,
      },
    },
    revisions: {
      revisions: revisionsDataStub,
    },
  } as ReduxState
  describe('selectAppRevisions', () => {
    it('should run correctly', () => {
      const output = selectAppRevisions(mockState)
      expect(output).toEqual(mockState.revisions.revisions)
    })
    it('should return {}', () => {
      const output = selectAppRevisions({} as ReduxState)
      expect(output).toEqual({})
    })
  })

  describe('selectAppRevisionDetail', () => {
    it('should run correctly', () => {
      const output = selectAppRevisionDetail(mockState)
      expect(output).toEqual(mockState.revisionDetail)
    })
    it('should return {}', () => {
      const output = selectAppRevisionDetail({} as ReduxState)
      expect(output).toEqual({})
    })
  })

  describe('selectAppRevision', () => {
    it('should run correctly', () => {
      const output = selectAppRevision(mockState)
      expect(output).toEqual(mockState.revisionDetail.revisionDetailData?.data)
    })
    it('should return {}', () => {
      const output = selectAppRevision({} as ReduxState)
      expect(output).toEqual({})
    })
  })
})
