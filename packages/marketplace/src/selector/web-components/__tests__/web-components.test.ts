import appState from '@/reducers/__stubs__/app-state'
import { selectWebComponentData, selectWebComponentLoading, selectWebComponentUpdating } from '../web-components'

describe('web-components', () => {
  describe('selectWebComponentData', () => {
    it('should return correctly', () => {
      expect(selectWebComponentData(appState)).toEqual(appState.webComponent.detail.data)
    })
  })
  describe('selectWebComponentLoading', () => {
    it('should return correctly', () => {
      expect(selectWebComponentLoading(appState)).toEqual(appState.webComponent.detail.isLoading)
    })
  })
  describe('selectWebComponentUpdating', () => {
    it('should return correctly', () => {
      expect(selectWebComponentUpdating(appState)).toEqual(appState.webComponent.update.isLoading)
    })
  })
})
