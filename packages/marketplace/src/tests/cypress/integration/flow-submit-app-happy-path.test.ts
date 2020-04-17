import developerSubmitAppPage from '../pages/developer-submit-app-page'
import developerAppsPage from '../pages/developer-apps-page'
import routes from '../fixtures/routes'
import nanoid from 'nanoid'
import { loginDeveloperHook } from '../hooks/login'

const appName = `Submit App -${nanoid()}`

const {
  actions: { deleteAppWithName },
} = developerAppsPage

const { selectors: developerSubmitAppPageSelectors } = developerSubmitAppPage

const { category, authFlow, isPrivateApp, submitButton, divSuccess } = developerSubmitAppPageSelectors

describe('Submit app happy path', () => {
  it('Log into dev and Submit an app successfully', () => {
    loginDeveloperHook()
    cy.server()
    cy.visit(developerSubmitAppPage.url)

    cy.route(routes.categories).as('getCategories')
    cy.route(routes.scopes).as('getScopes')
    cy.route(routes.desktopIntegrationTypes).as('getIntegrationTypes')
    cy.route('POST', routes.apps).as('postSubmitApp')

    cy.wait('@getCategories')
    cy.wait('@getScopes')
    cy.wait('@getIntegrationTypes')
    /**
     * Both Object.keys and for in loop element is string
     * string is not a key of developerSubmitAppPageSelectors or testData
     * -> Have to cast to any
     */
    const inputTestData: any = {
      name: appName,
      supportEmail: 'hi@gmail.com',
      telephone: '080808080',
      homePage: 'https://google.com/',
      launchUri: 'https://google.com/',
      summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      description:
        // eslint-disable-next-line
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      redirectUris: 'https://google.com',
      signoutUris: 'https://google.com',
    }

    for (let selectKey in inputTestData) {
      const data = inputTestData[selectKey]
      const selector = (developerSubmitAppPageSelectors as any)[selectKey]
      cy.get(selector).type(data)
    }
    const fileUploadTestData: any = {
      iconImage: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
      screenshot1: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=',
    }
    for (let selectKey in fileUploadTestData) {
      const data = fileUploadTestData[selectKey]
      const selector = (developerSubmitAppPageSelectors as any)[selectKey]
      cy.get(selector).upload(
        {
          fileContent: data,
          fileName: selector,
          mimeType: 'image/jpeg',
          encoding: 'binary',
        },
        { subjectType: 'input' },
      )
    }
    cy.get(category).select('9')
    cy.get(authFlow).check({ force: true })
    cy.get(isPrivateApp).check({ force: true })

    cy.get(submitButton).click()
    cy.wait('@postSubmitApp')
    cy.wait(1000)
    cy.get(divSuccess).should('have.length', 1)
  })

  after(() => {
    deleteAppWithName(appName)
  })
})
