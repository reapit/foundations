import { ReduxState } from '@/types/core'
import { revisionsDataStub } from '@/sagas/apps/__stubs__/revisions'
import { selectAppRevisionDetailData, selectAppRevisionDetail } from '../app-revisions'
import appState from '@/reducers/__stubs__/app-state'

describe('app-revision', () => {
  const mockState = {
    ...appState,
    apps: {
      ...appState.apps,
      revision: {
        ...appState.apps.revision,
        ...revisionsDataStub,
      },
    },
  } as ReduxState

  describe('selectAppRevisionDetail', () => {
    it('should run correctly', () => {
      const output = selectAppRevisionDetail(mockState)
      expect(output).toEqual(mockState.apps.revision)
    })
    it('should return {}', () => {
      const output = selectAppRevisionDetail({} as ReduxState)
      expect(output).toEqual({})
    })
  })

  describe('selectAppRevisionDetailData', () => {
    it('should run correctly', () => {
      const output = selectAppRevisionDetailData(mockState)
      expect(output).toEqual(mockState.apps.revision?.data)
    })
    it('should return {}', () => {
      const output = selectAppRevisionDetailData({} as ReduxState)
      expect(output).toEqual({})
    })
  })
})
