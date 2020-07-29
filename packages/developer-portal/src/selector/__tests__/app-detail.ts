import { selectAppDetailId, selectAppDetailInstallationId, selectAppDetailData } from '../app-detail'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { ReduxState } from '@/types/core'
import appState from '@/reducers/__stubs__/app-state'

describe('app-detail', () => {
  const mockState = {
    ...appState,
    apps: {
      detail: {
        data: appDetailDataStub.data,
        isLoading: false,
      },
    },
  } as ReduxState
  describe('selectAppDetailId', () => {
    it('should run correctly', () => {
      const result = selectAppDetailId(mockState)
      expect(result).toEqual(appDetailDataStub.data?.id)
    })

    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAppDetailId(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectAppDetailInstallationId', () => {
    it('should run correctly', () => {
      const result = selectAppDetailInstallationId(mockState)
      expect(result).toEqual(appDetailDataStub.data?.installationId)
    })

    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectAppDetailInstallationId(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectApp', () => {
    it('should run correctly', () => {
      const result = selectAppDetailData(mockState)
      expect(result).toEqual(mockState.apps.detail.data)
    })
    it('should return {}', () => {
      const input = {} as ReduxState
      const result = selectAppDetailData(input)
      expect(result).toEqual(input)
    })
  })
})
