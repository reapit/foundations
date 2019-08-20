class DeveloperAppDetail {
  get submitButton() {
    return $(`[data-test='detail-modal-edit-button'`)
  }
}

export default new DeveloperAppDetail()
