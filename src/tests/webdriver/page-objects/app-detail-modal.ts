import AppInstallConfirmModal from '../page-objects/app-install-confirm-modal'
import Common from '../shared/common'

class AppDetailModal {
  get btnAppDetailInstallApp() {
    return $(`[data-test='btnAppDetailInstallApp']`)
  }

  get btnAppDetailUninstallApp() {
    return $(`[data-test='btnAppDetailUninstallApp']`)
  }

  get alertInstallSuccess() {
    return $(`[data-test='alertInstalledSuccess']`)
  }

  installApp() {
    this.btnAppDetailInstallApp.waitForVisible()
    this.btnAppDetailInstallApp.click()

    // Confirm modal
    AppInstallConfirmModal.btnAgree.click()
    this.alertInstallSuccess.waitForVisible()
    Common.closeModal()
  }

  unInstallApp() {
    this.btnAppDetailUninstallApp.waitForVisible()
    this.btnAppDetailUninstallApp.click()

    // Confirm modal
    AppInstallConfirmModal.btnAgree.waitForVisible()
    AppInstallConfirmModal.btnAgree.click()
    this.alertInstallSuccess.waitForVisible()
    Common.closeModal()
  }
}

export default new AppDetailModal()
