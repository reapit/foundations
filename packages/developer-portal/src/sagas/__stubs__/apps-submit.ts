import { CreateAppModel } from '@reapit/foundations-ts-definitions'
import { CreateAppParams } from '@/services/apps'

export const appSubmitStub: { data: CreateAppModel } = {
  data: {
    categoryId: '',
    description: 'Lorem ipsum',
    homePage: 'https://reapit.com',
    iconImageUrl: 'https://some-s3-image-link.com',
    name: 'My app',
    launchUri: 'https://reapit.com',
    screen1ImageUrl: 'https://some-s3-image-link.com',
    screen2ImageUrl: 'https://some-s3-image-link.com',
    screen3ImageUrl: 'https://some-s3-image-link.com',
    screen4ImageUrl: 'https://some-s3-image-link.com',
    screen5ImageUrl: 'https://some-s3-image-link.com',
    summary: 'Lorem ipsum',
    supportEmail: 'support@reapit.com',
    telephone: '999999999',
  },
}

export const appSubmitStubWithActions: { data: CreateAppParams } = {
  data: ({
    ...appSubmitStub.data,
    callback: jest.fn(),
  } as unknown) as CreateAppParams,
}

export const appSubmitStubFailed: { data: CreateAppModel } = {
  data: {
    description: 'Lorem ipsum',
    homePage: 'https://reapit.com',
    iconImageUrl: 'https://some-s3-image-link.com',
    name: 'My app',
    launchUri: 'https://reapit.com',
    screen1ImageUrl: 'https://some-s3-image-link.com',
    screen2ImageUrl: 'https://some-s3-image-link.com',
    screen3ImageUrl: 'https://some-s3-image-link.com',
    screen4ImageUrl: 'https://some-s3-image-link.com',
    screen5ImageUrl: 'https://some-s3-image-link.com',
    summary: 'Lorem ipsum',
    supportEmail: 'support@reapit.com',
    telephone: '999999999',
  },
}

export const appSubmitStubFailedWithActions: { data: CreateAppParams } = {
  data: {
    ...appSubmitStubFailed.data,
    callback: jest.fn(),
  },
}
