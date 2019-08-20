class AppInstallConfirmModal {
  get btnAgree() {
    return $(`[data-test='agree-btn']`)
  }
}

export default new AppInstallConfirmModal()
