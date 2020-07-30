import appState from '@/reducers/__stubs__/app-state'
import { selectInstallAppState, selectUninstallAppState } from '../installations'

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
})
