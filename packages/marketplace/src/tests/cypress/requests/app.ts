import routes from '../fixtures/routes'
import { AppDetailModel, CreateAppRevisionModel } from '../types/app'

const sampleImageData =
  'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='

export const sampleApp = {
  categoryId: '3',
  authFlow: 'authorisationCode',
  telephone: '01234567890',
  supportEmail: 'submitAppHappyFlow@gmail.com',
  launchUri: 'https://google.com',
  homePage: 'https://google.com',
  description:
    'Lorem ipsum dolor amet organic fashion axe man bun cray kitsch hashtag post-ironic normcore copper mug keytar fam actually street art air plant. Copper mug put a bird on it kombucha pop-up. Man bun kickstarter fam pour-over plaid, franzen blog. Activated charcoal letterpress mlkshk kickstarter master cleanse. Paleo austin actually blue bottle mixtape mustache bicycle rights gochujang humblebrag. Direct trade affogato cliche, asymmetrical sartorial pinterest chambray coloring book.',
  summary:
    'Lorem ipsum dolor amet messenger bag pinterest af umami. Master cleanse photo booth cardigan, jean shorts dreamcatcher butcher ethical YOLO.',
  developerId: '47a37635-5044-4f20-b981-4f25970ac9cf',
  scopes: [],
  isFeatured: false,
  isDirectApi: false
}

export default {
  createApp: (name: string) => {
    cy.request({
      /**
       * Upload a dummy image (Backend validates image's links of an app when submitting must be from configured s3 bucket - a proper link is required )
       * And create an app
       */
      url: Cypress.env('UPLOAD_FILE_BASE_URL'),
      method: 'POST',
      body: {
        name: 'e2e-test-image',
        imageData: sampleImageData
      }
    }).then(res => {
      const imageUrl = res?.body?.Url

      if (!imageUrl) {
        throw new Error(
          `No field named "Url" was returned in the response of the request: POST ${Cypress.env(
            'UPLOAD_FILE_BASE_URL'
          )} `
        )
      }

      cy.request({
        url: `${routes.apps}`,
        method: 'POST',
        headers: {
          'x-api-key': Cypress.env('MARKETPLACE_API_KEY')
        },
        body: {
          ...sampleApp,
          name,
          screen5ImageUrl: imageUrl,
          screen4ImageUrl: imageUrl,
          screen3ImageUrl: imageUrl,
          screen2ImageUrl: imageUrl,
          screen1ImageUrl: imageUrl,
          iconImageUrl: imageUrl
        }
      })
    })
  },
  createAppRevision: (appId: string, existingApp: AppDetailModel, newRevision: Partial<CreateAppRevisionModel>) => {
    return cy.request({
      url: `${routes.apps}/${appId}/revisions`,
      method: 'POST',
      headers: {
        'x-api-key': Cypress.env('MARKETPLACE_API_KEY')
      },
      body: {
        ...existingApp,
        iconImageUrl: existingApp.media[0].uri,
        screen1ImageUrl: existingApp.media[0].uri,
        categoryId: existingApp.category.id,
        ...newRevision
      }
    })
  },
  deleteApp: (appId: string) => {
    cy.request({
      url: `${routes.apps}/${appId}`,
      method: 'DELETE',
      headers: {
        'x-api-key': Cypress.env('MARKETPLACE_API_KEY')
      }
    })
  },
  getAppIdByAppName: (appName: string) => {
    return cy.request({
      url: routes.apps,
      method: 'GET',
      qs: {
        AppName: appName
      },
      headers: {
        'x-api-key': Cypress.env('MARKETPLACE_API_KEY')
      }
    })
  },
  getAppById: (appId: string) => {
    return cy.request({
      url: `${routes.apps}/${appId}`,
      method: 'GET',
      headers: {
        'x-api-key': Cypress.env('MARKETPLACE_API_KEY')
      }
    })
  }
}
