import { CreateAppRevisionModel } from '../../types/marketplace-api-schema'

export const revisionSubmitStub: { data: CreateAppRevisionModel } = {
  data: {
    description: 'Lorem ipsum',
    homePage: 'https://reapit.com',
    iconImageUrl: 'https://some-s3-image-url.com',
    name: 'My app',
    launchUri: 'https://reapit.com',
    screen1ImageUrl: 'https://some-s3-image-url.com',
    screen2ImageUrl: 'https://some-s3-image-url.com',
    screen3ImageUrl: 'https://some-s3-image-url.com',
    screen4ImageUrl: 'https://some-s3-image-url.com',
    screen5ImageUrl: 'https://some-s3-image-url.com',
    summary: 'Lorem ipsum',
    supportEmail: 'support@reapit.com',
    telephone: '999999999'
  }
}
