class DeveloperAppModal {
  get btnDeleteApp() {
    return $('[data-test="detail-modal-delete-button"]')
  }

  get editDetailButton() {
    return $('[data-test="detail-modal-edit-button"]')
  }

  get closeModalButton() {
    return $('[data-test="modal-close-button"]')
  }

  clickEditDetailButton() {
    this.editDetailButton.click()
  }

  clickCloseModalButton() {
    this.closeModalButton.click()
  }
}

export default new DeveloperAppModal()
