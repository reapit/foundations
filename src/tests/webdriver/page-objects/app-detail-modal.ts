import AppPermissionModal from '../page-objects/app-permission-modal'
import AppInstallConfirmModal from '../page-objects/app-install-confirm-modal'
import Common from '../shared/common'

class AppDetailModal {
  get btnAppDetailInstallApp() {
    return $(`[data-test='btnAppDetailInstallApp']`)
  }

  get btnAppDetailUninstallApp() {
    return $(`[data-test='btnAppDetailUninstallApp']`)
  }

  installApp() {
    this.btnAppDetailInstallApp.waitForVisible()
    this.btnAppDetailInstallApp.click()

    // Permission modal
    AppPermissionModal.btnInstall.waitForVisible()
    AppPermissionModal.btnInstall.click()

    // Confirm modal
    AppInstallConfirmModal.btnAgree.click()
    AppPermissionModal.alertInstallSuccess.waitForVisible()
    Common.closeModal()
  }

  unInstallApp() {
    this.btnAppDetailUninstallApp.waitForVisible()
    this.btnAppDetailUninstallApp.click()

    // Confirm modal
    AppInstallConfirmModal.btnAgree.waitForVisible()
    AppInstallConfirmModal.btnAgree.click()
    AppPermissionModal.alertInstallSuccess.waitForVisible()
    Common.closeModal()
  }
}

export default new AppDetailModal()
