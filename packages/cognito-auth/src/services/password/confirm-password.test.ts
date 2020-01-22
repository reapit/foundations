import { confirmPasswordService } from './confirm-password'

jest.mock('amazon-cognito-identity-js', () => require('../../__mocks__/cognito-session').mockCognito)

describe('confirmPasswordService', () => {
  it('should return a success message', async () => {
    expect(
      await confirmPasswordService({ userName: 'bob@acme.com', verificationCode: 'SOME_CODE', newPassword: 'xxxxx' })
    ).toEqual('SUCCESS')
  })
})
