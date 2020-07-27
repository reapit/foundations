import {
  getAccessToken,
  getDeveloperIdFromConnectSession,
  getClientIdFromConnectSession,
  getDeveloperId,
  getClientId,
  getLoggedUserEmail,
} from '../session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'

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
    new Promise(resolve => {
      resolve(mockedConnectSession)
    }),
)

describe('getAccessToken', () => {
  it('should correctly return', async () => {
    expect(await getAccessToken()).toEqual('accessToken')
  })
})

describe('getDeveloperIdFromConnectSession', () => {
  it('should correctly return', async () => {
    const developerId = getDeveloperIdFromConnectSession(mockedConnectSession)
    expect(developerId).toEqual('developerId')
  })
})

describe('getClientIdFromConnectSession', () => {
  it('should correctly return', async () => {
    const clientId = getClientIdFromConnectSession(mockedConnectSession)
    expect(clientId).toEqual('clientId')
  })
})

describe('getDeveloperId', () => {
  it('should correctly return', async () => {
    const developerId = await getDeveloperId()
    expect(developerId).toEqual('developerId')
  })
})

describe('getClientId', () => {
  it('should correctly return', async () => {
    const clientId = await getClientId()
    expect(clientId).toEqual('clientId')
  })
})

describe('getLoggedUserEmail', () => {
  it('should correctly return', async () => {
    const email = await getLoggedUserEmail()
    expect(email).toEqual('email')
  })
})
