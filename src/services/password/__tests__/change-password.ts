import { changePasswordService } from '../change-password'

jest.mock('amazon-cognito-identity-js', () => require('../../../__mocks__/cognito').mockCognito)

describe('changePasswordService', () => {
  it('should return a success message', async () => {
    expect(await changePasswordService({ userName: 'bob@acme.com', password: 'xxxx', newPassword: 'xxxxx' })).toEqual(
      'SUCCESS'
    )
  })
})
