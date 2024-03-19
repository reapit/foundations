import { ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { BASE_HEADERS } from '../../constants/api'
import { genPlatformHeaders } from '../headers'

const mockedConnectSession = {
  accessToken: 'accessToken',
  loginIdentity: {
    clientId: 'clientId',
    developerId: 'developerId',
    email: 'email',
  },
} as ReapitConnectSession
jest.spyOn(reapitConnectBrowserSession, 'connectSession').mockImplementation(
  () =>
    new Promise((resolve) => {
      resolve(mockedConnectSession)
    }),
)

describe('genPlatformHeaders', () => {
  it('should correctly return', async () => {
    const res = await genPlatformHeaders()
    expect(res).toEqual({ ...BASE_HEADERS, Authorization: 'Bearer accessToken' })
  })
})
