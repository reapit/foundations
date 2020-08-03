import { ReduxState } from '@/types/core'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'
import { selectAppRevision, selectAppRevisions, selectAppRevisionDetail } from '../app-revisions'
import appState from '@/reducers/__stubs__/app-state'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'

describe('app-revision', () => {
  const mockState = {
    ...appState,
    apps: {
      revisions: {
        detail: {
          data: revisionDetailDataStub,
        },
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
      expect(output).toEqual(mockState.apps.revisions.detail)
    })
    it('should return {}', () => {
      const output = selectAppRevisionDetail({} as ReduxState)
      expect(output).toEqual({})
    })
  })
})
