import { CreateAppModel } from '@/types/marketplace-api-schema'
import { SubmitAppArgs } from '@/actions/submit-app'

export const appSubmitStub: { data: CreateAppModel } = {
  data: {
    developerId: '0ba39c29-5e3a-45a7-9a7c-e9f9b53fb189',
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

export const appSubmitStubWithActions: { data: SubmitAppArgs } = {
  data: {
    ...appSubmitStub.data,
    // @ts-ignore
    actions: {
      setStatus: status => status,
      setErrors: errors => errors
    }
  }
}

export const appSubmitStubFailed: { data: CreateAppModel } = {
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

export const appSubmitStubFailedWithActions: { data: SubmitAppArgs } = {
  data: {
    ...appSubmitStubFailed.data,
    // @ts-ignore
    actions: {
      setStatus: status => status,
      setErrors: errors => errors
    }
  }
}
