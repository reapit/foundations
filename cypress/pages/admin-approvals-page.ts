import routes from '@/constants/routes'

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
    }
  }
}

export default adminApprovalsPage
