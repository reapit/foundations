import loginPage from '../pages/login-page'
import developerSubmitAppPage from '../pages/developer-submit-app-page'
import developerAppsPage from '../pages/developer-apps-page'
import appRequests from '../requests/app'
import routes from '../fixtures/routes'
import nanoid from 'nanoid'

const appName = `E2E Test App -${nanoid()}`

const {
  actions: { loginUsingDeveloperAccount }
} = loginPage

const { selectors: developerSubmitAppPageSelectors } = developerSubmitAppPage

const {
  checkBoxUserSession,
  buttonSubmit,
  selectCategory,
  submitSuccessSection,
  checkboxAgreeTheTermsAndConditions
} = developerSubmitAppPageSelectors

describe('Submit app happy path', () => {
  it('Log into dev and Submit an app successfully', () => {
    loginUsingDeveloperAccount()

    cy.visit(developerSubmitAppPage.url)
    cy.server()

    cy.route(routes.appsOfDeveloper).as('getAppsOfDeveloper')
    cy.route(routes.categories).as('getCategories')
    cy.route(routes.scopes).as('getScopes')
    cy.route('POST', routes.apps).as('postSubmitApp')

    cy.wait('@getCategories')
    cy.wait('@getScopes')
    /**
     * Both Object.keys and for in loop element is string
     * string is not a key of developerSubmitAppPageSelectors or testData
     * -> Have to cast to any
     */
    const inputTestData: any = {
      textBoxName: appName,
      textBoxSupportEmail: 'submitAppHappyFlow@gmail.com',
      textBoxTelephone: '01234567890',
      textBoxHomePage: 'https://google.com',
      textBoxLaunchUrl: 'https://google.com',
      textAreaDescription:
        'Lorem ipsum dolor amet organic fashion axe man bun cray kitsch hashtag post-ironic normcore copper mug keytar fam actually street art air plant. Copper mug put a bird on it kombucha pop-up. Man bun kickstarter fam pour-over plaid, franzen blog. Activated charcoal letterpress mlkshk kickstarter master cleanse. Paleo austin actually blue bottle mixtape mustache bicycle rights gochujang humblebrag. Direct trade affogato cliche, asymmetrical sartorial pinterest chambray coloring book.',
      textAreaSummary:
        'Lorem ipsum dolor amet messenger bag pinterest af umami. Master cleanse photo booth cardigan, jean shorts dreamcatcher butcher ethical YOLO.'
    }
    for (let inputTestDataSelector in inputTestData) {
      const data = inputTestData[inputTestDataSelector]
      const selector = (developerSubmitAppPageSelectors as any)[inputTestDataSelector]
      cy.get(selector).type(data)
    }
    const fileUploadTestData: any = {
      inputFileSubmitAppIcon:
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
      fileUploadScreenshot1:
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=',
      fileUploadScreenshot2:
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
      fileUploadScreenshot3:
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4PpfDwACpQGKFCvGMAAAAABJRU5ErkJggg==',
      fileUploadScreenshot4:
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMK86uBwAEMAG9Q194bwAAAABJRU5ErkJggg=='
    }
    for (let fileUploadTestDataSelector in fileUploadTestData) {
      const data = fileUploadTestData[fileUploadTestDataSelector]
      const selector = (developerSubmitAppPageSelectors as any)[fileUploadTestDataSelector]
      cy.get(selector).upload(
        {
          fileContent: data,
          fileName: selector,
          mimeType: 'image/jpeg',
          encoding: 'binary'
        },
        { subjectType: 'input' }
      )
    }
    cy.get(selectCategory).select('Game')
    cy.get(checkBoxUserSession).click({ force: true })
    cy.get(checkboxAgreeTheTermsAndConditions).click({
      force: true
    })

    cy.get(buttonSubmit).click()
    cy.wait(100)
    cy.wait('@postSubmitApp')
    cy.get(submitSuccessSection).should('have.length', 1)

    // Cleanup
    cy.visit(developerAppsPage.url)
    cy.wait('@getAppsOfDeveloper')
    cy.get(`div[data-test-app-name='${appName}']`)
      .should('have.length', 1)
      .invoke('attr', 'data-test-app-id')
      .then(appId => {
        appRequests.deleteApp(appId as any)
      })
  })
})
