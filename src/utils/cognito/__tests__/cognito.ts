import { getCognitoSession, refreshCognitoSession } from '../cognito'
import { mockLoginParams, mockLoginSession, mockRefreshParams } from '../__mocks__/cognito'

jest.mock('../../session/index')

describe('getCognitoSession', () => {
  it('should fetch and return a login session', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => mockLoginSession
    })
    expect(await getCognitoSession(mockLoginParams)).toEqual(mockLoginSession)
  })

  it('should return null if login fails', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => null
    })
    expect(await getCognitoSession(mockLoginParams)).toBeNull()
  })
})

describe('refreshCognitoSession', () => {
  it('should fetch and return a login session', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => mockLoginSession
    })
    expect(await refreshCognitoSession(mockRefreshParams)).toEqual(mockLoginSession)
  })

  it('should return null if login fails', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => null
    })
    expect(await refreshCognitoSession(mockRefreshParams)).toBeNull()
  })
})
