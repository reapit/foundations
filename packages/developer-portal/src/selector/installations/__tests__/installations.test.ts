import {
  selectInstallationsListLoading,
  selectInstallationFormState,
  selectInstallationsListData,
  selectInstallationsFilterListData,
  selectInstallationsFilterList,
  selectInstallationsLoading,
  selectInstallationsFilterLoading,
} from '../installations'
import appState from '@/reducers/__stubs__/app-state'

describe('installations', () => {
  test('selectInstallationsFilterLoading', () => {
    const data = selectInstallationsFilterLoading(appState)
    expect(data).toEqual(false)
  })
  describe('selectInstallationsListLoading', () => {
    it('should return correct data', () => {
      const data = selectInstallationsListLoading(appState)
      expect(data).toEqual(false)
    })
  })
  describe('selectInstallationFormState', () => {
    it('should return correct data', () => {
      const data = selectInstallationFormState(appState)
      expect(data).toEqual('PENDING')
    })
  })
  describe('selectInstallationsListData', () => {
    it('should return correct data', () => {
      const data = selectInstallationsListData(appState)
      expect(data).toEqual([])
    })
  })
  describe('selectInstallationsFilterListData', () => {
    it('should return correct data', () => {
      const data = selectInstallationsFilterListData(appState)
      expect(data).toEqual([])
    })
  })
  describe('selectInstallationsFilterList', () => {
    it('should return correct data', () => {
      const data = selectInstallationsFilterList(appState)
      expect(data).toEqual({})
    })
  })
  describe('selectInstallationsLoading', () => {
    it('should return correct data', () => {
      const data = selectInstallationsLoading(appState)
      expect(data).toEqual(false)
    })
  })
})
