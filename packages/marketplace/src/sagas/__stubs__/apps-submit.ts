import { CreateAppModel } from '@reapit/foundations-ts-definitions'
import { SubmitAppArgs } from '@/actions/submit-app'

export const appSubmitStub: { data: CreateAppModel } = {
  data: {
    developerId: '0ba39c29-5e3a-45a7-9a7c-e9f9b53fb189',
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

export const appSubmitStubWithActions: { data: SubmitAppArgs } = {
  data: {
    ...appSubmitStub.data,
    // @ts-ignore
    actions: {
      setStatus: status => status,
      setErrors: errors => errors,
    },
  },
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

export const appSubmitStubFailedWithActions: { data: SubmitAppArgs } = {
  data: {
    ...appSubmitStubFailed.data,
    // @ts-ignore
    actions: {
      setStatus: status => status,
      setErrors: errors => errors,
    },
  },
}
