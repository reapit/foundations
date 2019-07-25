import { CreateAppRevisionModel } from '../../types/marketplace-api-schema'

export const revisionSubmitStub: { data: CreateAppRevisionModel } = {
  data: {
    description: 'Lorem ipsum',
    homePage: 'https://reapit.com',
    iconImageData: 'base64 string...',
    name: 'My app',
    launchUri: 'https://reapit.com',
    screen1ImageData: 'base64 string...',
    screen2ImageData: 'base64 string...',
    screen3ImageData: 'base64 string...',
    screen4ImageData: 'base64 string...',
    screen5ImageData: 'base64 string...',
    summary: 'Lorem ipsum',
    supportEmail: 'support@reapit.com',
    telephone: '999999999'
  }
}
