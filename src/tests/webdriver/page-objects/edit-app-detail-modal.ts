import * as path from 'path'

class EditAppDetailModal {
  populateImageToRequiredImageInputField() {
    const file = path.join(__dirname, './image.png')
    browser.chooseFile('[data-test="submit-app-iconImageData"]', file)
    browser.chooseFile('[data-test="submit-app-screenshoot1"]', file)
  }

  get chkIsListed() {
    return $(`[data-test='submit-revision-isListed'`)
  }

  get submitButton() {
    return $('button[type="submit"]')
  }

  get successMessage() {
    return $('button[type="submit"]')
  }

  submitForm() {
    this.submitButton.click()
    browser.pause(5000)
  }
}

export default new EditAppDetailModal()
