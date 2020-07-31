import appState from '@/reducers/__stubs__/app-state'
import { ReduxState } from '@/types/core'
import { selectAppDetailData, selectAppDetailLoading, selectAppsListState, selectFeatureAppsListState } from '../app'

describe('app', () => {
  describe('selectAppDetailData', () => {
    it('should run correctly', () => {
      const result = selectAppDetailData(appState)
      expect(result).toEqual(appState.apps.detail.data)
    })
    it('should return {}', () => {
      const result = selectAppDetailData({} as ReduxState)
      expect(result).toEqual({})
    })
  })
  describe('selectAppDetailLoading', () => {
    it('should run correctly', () => {
      const result = selectAppDetailLoading(appState)
      expect(result).toEqual(appState.apps.detail.isLoading)
    })
    it('should return undefined', () => {
      const result = selectAppDetailLoading({} as ReduxState)
      expect(result).toEqual(undefined)
    })
  })
  describe('selectFeatureAppsListState', () => {
    it('should return correctly', () => {
      const result = selectFeatureAppsListState(appState)
      expect(result).toEqual(appState.apps.featureList)
    })
    it('should return {}', () => {
      const result = selectFeatureAppsListState({} as ReduxState)
      expect(result).toEqual({})
    })
  })
  describe('selectAppsListState', () => {
    it('should return correctly', () => {
      const result = selectAppsListState(appState)
      expect(result).toEqual(appState.apps.list)
    })
    it('should return {}', () => {
      const result = selectAppsListState({} as ReduxState)
      expect(result).toEqual({})
    })
  })
})
