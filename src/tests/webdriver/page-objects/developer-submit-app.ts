import Base from './base'
import * as path from 'path'
import Common from '../shared/common'

class DeveloperSubmitAppPage extends Base {
  get route() {
    return '/developer/submit-app'
  }

  get validFormData() {
    return {
      name: Common.appName,
      telephone: '0123456789',
      supportEmail: 'name@gmail.com',
      launchUri: 'https://google.com',
      iconImageData: '12345',
      homePage: 'https://google.com/abc',
      description:
        'Lorem ipsum dolor amet organic fashion axe man bun cray kitsch hashtag post-ironic normcore copper mug keytar fam actually street art air plant. Copper mug put a bird on it kombucha pop-up. Man bun kickstarter fam pour-over plaid, franzen blog. Activated charcoal letterpress mlkshk kickstarter master cleanse. Paleo austin actually blue bottle mixtape mustache bicycle rights gochujang humblebrag. Direct trade affogato cliche, asymmetrical sartorial pinterest chambray coloring book.',
      summary:
        'Lorem ipsum dolor amet messenger bag pinterest af umami. Master cleanse photo booth cardigan, jean shorts dreamcatcher butcher ethical YOLO.'
    }
  }

  get form() {
    return $('[data-test="submit-app-form"]')
  }

  get name() {
    return $('[data-test="submit-app-name"]')
  }

  get description() {
    return $('[data-test="submit-app-description"]')
  }

  get summary() {
    return $('[data-test="submit-app-summary"]')
  }

  get telephone() {
    return $('[data-test="submit-app-phone"]')
  }

  get homePage() {
    return $('[data-test="submit-app-home-page"]')
  }

  get launchUri() {
    return $('[data-test="submit-app-launch-uri"]')
  }

  get supportEmail() {
    return $('[data-test="submit-app-support-email"]')
  }

  get icon() {
    return $('[data-test="submit-ap-icon"]')
  }

  get screenshot1() {
    return $('[data-test="submit-app-screenshot1"]')
  }

  get screenshot2() {
    return $('[data-test="submit-app-screenshot2"]')
  }

  get screenshot3() {
    return $('[data-test="submit-app-screenshot3"]')
  }

  get screenshot4() {
    return $('[data-test="submit-app-screenshot4"]')
  }

  get submitButton() {
    return $('[data-test="submit-app-button"]')
  }

  get allInputs() {
    return $$('input, textarea')
  }

  get successMessageSection() {
    return $('[data-test="submit-success-section"]')
  }

  get errorMessages() {
    return $$('[data-test="input-error"]')
  }

  get submitAnotherButton() {
    return $('[data-test="submit-another-button"]')
  }

  populateValidForm() {
    this.name.setValue(this.validFormData.name)
    this.supportEmail.setValue(this.validFormData.supportEmail)
    this.telephone.setValue(this.validFormData.telephone)
    this.summary.setValue(this.validFormData.summary)
    this.description.setValue(this.validFormData.description)
    this.launchUri.setValue(this.validFormData.launchUri)
    this.homePage.setValue(this.validFormData.homePage)

    // image
    const file = path.join(__dirname, './image.png')
    browser.chooseFile('[data-test="submit-app-icon"]', file)
    browser.chooseFile('[data-test="submit-app-screenshot1"]', file)
  }

  submitForm() {
    this.submitButton.click()
  }

  submitAnother() {
    this.submitAnotherButton.click()
  }

  open() {
    super.open(this.route)
  }

  submitApp() {
    this.form.waitForVisible()
    this.populateValidForm()
    this.submitForm()
    this.successMessageSection.waitForVisible()
  }
}

export default new DeveloperSubmitAppPage()
