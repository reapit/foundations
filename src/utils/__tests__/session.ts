import { getAccessToken } from '../session'
import { getSession } from '@reapit/cognito-auth'

jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
  state: {
    online: {},
    auth: {}
  }
}))

jest.mock('@reapit/cognito-auth')

describe('getAccessToken', () => {
  it('should correctly return an access token if a valid session exists', async () => {
    ;(getSession as jest.Mock).mockImplementation(() => ({ accessToken: 'SOME_TOKEN' }))
    expect(await getAccessToken()).toEqual('SOME_TOKEN')
  })

  it('should return null if no session exists', async () => {
    ;(getSession as jest.Mock).mockImplementation(() => null)
    expect(await getAccessToken()).toEqual(null)
  })
})
