import routes from '@/constants/routes'
import apiRoutes from '../fixtures/routes'

const adminApprovalsPageMetaData = {
  url: routes.ADMIN_APPROVALS,
  selectors: {
    container: '#page-admin-approvals-container',
    buttonApprove: 'button[data-test="revision-approve-button"]',
    btnConfirmApproval: 'button[data-test="revision-approve-submit"]',
    btnApproveSuccess: 'button[data-test="approve-revision-success-button"]',
    divApproveAppSuccessfully: 'div[data-test="approve-revision-success-message"]'
  }
}

const adminApprovalsPage = {
  ...adminApprovalsPageMetaData,
  actions: {
    clickViewDetailsButtonWithAppId(id: string) {
      cy.get(`button[data-test="view-details-button_${id}"]`).click()
    },
    approveAppWithId(id: string) {
      const { buttonApprove, btnConfirmApproval, divApproveAppSuccessfully } = adminApprovalsPageMetaData.selectors
      cy.get(`button[data-test="view-details-button_${id}"]`).click()
      cy.get(buttonApprove).click()

      cy.route('POST', apiRoutes.approveApp).as('requestApproveApp')
      cy.get(btnConfirmApproval).click()
      cy.wait('@requestApproveApp')

      cy.get(divApproveAppSuccessfully).should('have.length', 1)
    }
  }
}

export default adminApprovalsPage
