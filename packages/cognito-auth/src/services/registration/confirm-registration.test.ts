import { confirmRegistrationService } from './confirm-registration'

jest.mock('amazon-cognito-identity-js', () => require('../../__mocks__/cognito-session').mockCognito)

describe('confirmRegistrationService', () => {
  it('should return a success message', async () => {
    expect(await confirmRegistrationService({ userName: 'bob@acme.com', verificationCode: 'SOME_CODE' })).toEqual(
      'SUCCESS',
    )
  })
})
