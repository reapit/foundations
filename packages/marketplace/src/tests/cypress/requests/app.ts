import routes from '../fixtures/routes'
import { AppDetailModel, CreateAppRevisionModel } from '../types/app'

const sampleImageData =
  'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAA' +
  'AfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=='

export const sampleApp = {
  categoryId: '9',
  authFlow: 'authorisationCode',
  screen5ImageUrl: '',
  screen4ImageUrl: '',
  screen3ImageUrl: '',
  screen2ImageUrl: '',
  telephone: 'hi@gmail.com',
  supportEmail: 'hi@gmail.com',
  launchUri: 'https://google.com/',
  iconImageUrl: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/hi-icon(1).png',
  homePage: 'https://google.com/',
  description:
    // eslint-disable-next-line
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  developerId: '15fa9b2b-6c73-432d-a1f4-9f3391743da4',
  scopes: ['agencyCloud/applicants.read'],
  isPrivateApp: 'no',
  redirectUris: ['https://google.com'],
  signoutUris: ['https://google.com'],
}

export default {
  createApp: (name: string) => {
    cy.request({
      /**
       * Upload a dummy image (Backend validates image's links of an app when submitting
       * must be from configured s3 bucket - a proper link is required )
       * And create an app
       */
      url: Cypress.env('uploadApiUrl'),
      method: 'POST',
      body: {
        name: 'e2e-test-image',
        imageData: sampleImageData,
      },
    }).then(res => {
      const imageUrl = res?.body?.Url

      if (!imageUrl) {
        throw new Error(
          `No field named "Url" was returned in the response of the request: POST ${Cypress.env(
            'UPLOAD_FILE_BASE_URL',
          )} `,
        )
      }

      cy.request({
        url: `${routes.apps}`,
        method: 'POST',
        headers: {
          'x-api-key': Cypress.env('marketplaceApiKey'),
        },
        body: {
          ...sampleApp,
          name,
          screen5ImageUrl: imageUrl,
          screen4ImageUrl: imageUrl,
          screen3ImageUrl: imageUrl,
          screen2ImageUrl: imageUrl,
          screen1ImageUrl: imageUrl,
          iconImageUrl: imageUrl,
        },
      })
    })
  },
  createAppRevision: (appId: string, existingApp: AppDetailModel, newRevision: Partial<CreateAppRevisionModel>) => {
    return cy.request({
      url: `${routes.apps}/${appId}/revisions`,
      method: 'POST',
      headers: {
        'x-api-key': Cypress.env('marketplaceApiKey'),
      },
      body: {
        ...existingApp,
        scopes: ['agencyCloud/applicants.read'],
        iconImageUrl: existingApp.media[0].uri,
        screen1ImageUrl: existingApp.media[0].uri,
        categoryId: existingApp.category.id,
        ...newRevision,
      },
    })
  },
  deleteApp: (appId: string) => {
    cy.request({
      url: `${routes.apps}/${appId}`,
      method: 'DELETE',
      headers: {
        'x-api-key': Cypress.env('marketplaceApiKey'),
      },
    })
  },
  getAppIdByAppName: (appName: string) => {
    return cy.request({
      url: routes.apps,
      method: 'GET',
      qs: {
        AppName: appName,
      },
      headers: {
        'x-api-key': Cypress.env('marketplaceApiKey'),
      },
    })
  },
  getAppById: (appId: string) => {
    return cy.request({
      url: `${routes.apps}/${appId}`,
      method: 'GET',
      headers: {
        'x-api-key': Cypress.env('marketplaceApiKey'),
      },
    })
  },
}
