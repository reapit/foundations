import AppPermissionModal from '../page-objects/app-permission-modal'
import AppInstallConfirmModal from '../page-objects/app-install-confirm-modal'
import CommonPage from '../page-objects/common'

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
    CommonPage.closeModal()
  }
}

export default new AppDetailModal()
