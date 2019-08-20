class AppPermissionModal {
  get btnInstall() {
    return $(`[data-test='btnInstall']`)
  }

  get alertInstallSuccess() {
    return $(`[data-test='alertInstalledSuccess']`)
  }
}

export default new AppPermissionModal()
