import Base from './base'
import AdminLogin from './admin-login'

class AdminPage extends Base {
  get route() {
    return '/admin/approvals'
  }

  get approveButton() {
    return $('[data-test="revision-approve-button"]')
  }

  get submitButton() {
    return $('[data-test="revision-approve-submit"]')
  }

  get approvedMessage() {
    return $$('[data-test="approve-revision-success-message"] h3 span')[1]
  }

  open() {
    AdminLogin.login()
    super.open(this.route)
  }

  doApproval(appId) {
    const app = $(`[data-test*="${appId}"]`)

    app.click()
    browser.pause(2000)

    this.approveButton.click()
    this.submitButton.waitForVisible()
    this.submitButton.click()
  }
}

export default new AdminPage()
