import { getAccessToken } from '../session'
import { getSession } from '@reapit/cognito-auth'
import store from '@/core/store'
import { authSetRefreshSession } from '@/actions/auth'

jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
  state: {
    online: {},
    auth: {
      refreshSession: {
        refreshToken: null,
        userName: null,
        cognitoClientId: null,
      },
    },
  },
}))
jest.mock('@reapit/cognito-auth')

describe('getAccessToken', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should correctly return an access token if a valid session exists', async () => {
    ;(getSession as jest.Mock).mockImplementation(() => ({ accessToken: 'SOME_TOKEN' }))
    expect(await getAccessToken()).toEqual('SOME_TOKEN')
  })

  it('should return null if no session exists', async () => {
    ;(getSession as jest.Mock).mockImplementation(() => null)
    expect(await getAccessToken()).toEqual(null)
  })

  it('should dispatch authSetRefreshSession with correct params', async () => {
    const mockValue = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      userName: 'name',
      cognitoClientId: 'clientId',
      loginType: 'CLIENT' as const,
      mode: 'WEB' as const,
    }
    ;(getSession as jest.Mock).mockImplementation(() => mockValue)
    expect(await getAccessToken()).toEqual('accessToken')
    expect(store.dispatch).toHaveBeenCalledWith(
      authSetRefreshSession({
        ...mockValue,
        redirectUri: null,
        state: null,
        authorizationCode: null,
      }),
    )
  })
})
