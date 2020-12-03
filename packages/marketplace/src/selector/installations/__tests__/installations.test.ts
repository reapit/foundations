import appState from '@/reducers/__stubs__/app-state'
import {
  selectInstallAppState,
  selectInstallationsList,
  selectInstallationsLoading,
  selectUninstallAppState,
} from '../installations'

describe('installations', () => {
  describe('selectInstallAppState', () => {
    it('should run correctly', () => {
      expect(selectInstallAppState(appState)).toEqual(appState.installations.install)
    })
  })

  describe('selectUninstallAppState', () => {
    it('should run correctly', () => {
      expect(selectUninstallAppState(appState)).toEqual(appState.installations.uninstall)
    })
  })

  describe('selectInstallationsList', () => {
    it('should run correctly', () => {
      expect(selectInstallationsList(appState)).toEqual(appState.installations.list.list)
    })
  })

  describe('selectInstallationsLoading', () => {
    it('should run correctly', () => {
      expect(selectInstallationsLoading(appState)).toEqual(appState.installations.list.isLoading)
    })
  })
})
