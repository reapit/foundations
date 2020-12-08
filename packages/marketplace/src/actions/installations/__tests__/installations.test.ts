import ActionTypes from '@/constants/action-types'
import {
  fetchInstallationsList,
  fetchInstallationsListFailed,
  fetchInstallationsListSuccess,
  installApp,
  installAppFailed,
  installAppSuccess,
  uninstallApp,
  uninstallAppFailed,
  uninstallAppSuccess,
} from '../installations'

describe('installations', () => {
  describe('installApp', () => {
    it('should create a installAppSuccess action', () => {
      expect(installApp.type).toEqual(ActionTypes.INSTALL_APP)
    })
  })

  describe('installAppSuccess', () => {
    it('should create a installAppSuccess action', () => {
      expect(installAppSuccess.type).toEqual(ActionTypes.INSTALL_APP_SUCCESS)
    })
  })

  describe('installAppFailed', () => {
    it('should create a installAppFailed action', () => {
      expect(installAppFailed.type).toEqual(ActionTypes.INSTALL_APP_FAILED)
    })
  })

  describe('uninstallApp', () => {
    it('should create a uninstallAppSuccess action', () => {
      expect(uninstallApp.type).toEqual(ActionTypes.UNINSTALL_APP)
    })
  })

  describe('uninstallAppSuccess', () => {
    it('should create a uninstallAppSuccess action', () => {
      expect(uninstallAppSuccess.type).toEqual(ActionTypes.UNINSTALL_APP_SUCCESS)
    })
  })

  describe('uninstallAppFailed', () => {
    it('should create a uninstallAppFailed action', () => {
      expect(uninstallAppFailed.type).toEqual(ActionTypes.UNINSTALL_APP_FAILED)
    })
  })

  describe('fetchInstallationsList', () => {
    it('should create a fetchInstallationsList action', () => {
      expect(fetchInstallationsList.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_LIST)
    })
  })

  describe('fetchInstallationsListSuccess', () => {
    it('should create a fetchInstallationsListSuccess action', () => {
      expect(fetchInstallationsListSuccess.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_LIST_SUCCESS)
    })
  })

  describe('fetchInstallationsListFailed', () => {
    it('should create a fetchInstallationsListFailed action', () => {
      expect(fetchInstallationsListFailed.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_LIST_FAILED)
    })
  })
})
