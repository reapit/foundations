import * as path from 'path'
import client from './client'

class DeveloperAppModalInner {
  get validFormData() {
    return {
      name: Math.random()
        .toString(36)
        .slice(-5),
      telephone: '0123456789',
      supportEmail: 'supportEmail@gmail.com',
      launchUri: 'http://google.com',
      iconImageData: '12345',
      homePage: 'http://google.com/reapit',
      description:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable',
      summary:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
    }
  }

  get submitRevisionButton() {
    return $('[data-test="submit-revision-modal-edit-button"]')
  }

  get closeModalButton() {
    return $('[data-test="modal-close-button"]')
  }

  get cancelModalButton() {
    return $('[data-test="submit-revision-modal-cancel-button"]')
  }

  get name() {
    return $('[data-test="submit-revision-name"]')
  }

  get description() {
    return $('[data-test="submit-revision-description"]')
  }

  get summary() {
    return $('[data-test="submit-revision-summary"]')
  }

  get telephone() {
    return $('[data-test="submit-revision-telephone"]')
  }

  get homePage() {
    return $('[data-test="submit-revision-homepage"]')
  }

  get launchUri() {
    return $('[data-test="submit-revision-launchUri"]')
  }

  get supportEmail() {
    return $('[data-test="submit-revision-support-email"]')
  }

  get icon() {
    return $('[data-test="submit-app-iconImageData"]')
  }

  get screenshot1() {
    return $('[data-test="submit-app-screenshoot1"]')
  }

  get screenshot2() {
    return $('[data-test="submit-app-screenshoot2"]')
  }

  get screenshot3() {
    return $('[data-test="submit-app-screenshoot3"]')
  }

  get screenshot4() {
    return $('[data-test="submit-app-screenshoot4"]')
  }

  clickSubmitRevisionButton() {
    this.submitRevisionButton.click()
  }

  clickCloseModalButton() {
    this.closeModalButton.click()
  }

  clickCancelModalButton() {
    this.cancelModalButton.click()
  }

  populateValidFormForUpdating() {
    this.name.keys(['Control', 'a', 'Delete'])
    this.name.setValue(this.validFormData.name)

    this.supportEmail.keys(['Control', 'a', 'Delete'])
    this.supportEmail.setValue(this.validFormData.supportEmail)

    this.telephone.keys(['Control', 'a', 'Delete'])
    this.telephone.setValue(this.validFormData.telephone)

    this.summary.keys(['Control', 'a', 'Delete'])
    this.summary.setValue(this.validFormData.summary)

    this.description.keys(['Control', 'a', 'Delete'])
    this.description.setValue(this.validFormData.description)

    this.launchUri.keys(['Control', 'a', 'Delete'])
    this.launchUri.setValue(this.validFormData.launchUri)

    this.homePage.keys(['Control', 'a', 'Delete'])
    this.homePage.setValue(this.validFormData.homePage)

    const file = path.join(__dirname, './image.png')
    browser.chooseFile('[data-test="submit-app-iconImageData"]', file)
    browser.chooseFile('[data-test="submit-app-screenshoot1"]', file)
  }
}

export default new DeveloperAppModalInner()
