import { resetPasswordService } from './reset-password'

jest.mock('amazon-cognito-identity-js', () => require('../../__mocks__/cognito-session').mockCognito)

describe('resetPasswordService', () => {
  it('should return a success message', async () => {
    expect(await resetPasswordService({ userName: 'bob@acme.com', cognitoClientId: 'someCognitoClientId' })).toEqual(
      'SUCCESS',
    )
  })
})
