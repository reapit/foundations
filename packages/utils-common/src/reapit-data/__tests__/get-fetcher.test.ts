import { GetActionNames, getActions, getFetcher } from '..'
import { ReapitConnectSession } from '@reapit/connect-session'

const mockData = {
  key: 'value',
}

const mockConnectSession = {
  accessToken: 'SOME_TOKEN',
} as ReapitConnectSession

const mockLogger = jest.fn()
const controller = new AbortController()
const signal = controller.signal

describe('getFetcher', () => {
  it('fetches and returns data if response is ok', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      ok: true,
      json: () => mockData,
    })

    const response = await getFetcher({
      action: getActions('local')[GetActionNames.getApps],
      connectSession: mockConnectSession,
      logger: mockLogger,
      signal,
    })

    expect(response).toEqual(mockData)
  })

  it('catches an error if the status code is not ok', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      ok: false,
      json: jest.fn(() => ({})),
    })

    try {
      const response = await getFetcher({
        action: getActions('local')[GetActionNames.getApps],
        connectSession: mockConnectSession,
        logger: mockLogger,
        signal,
      })
      expect(response).toBeUndefined()
    } catch (err) {
      expect(mockLogger).toHaveBeenCalledWith(
        new Error(`${getActions('local')[GetActionNames.getApps].errorMessage} `),
        mockConnectSession,
      )
    }
  })

  it('catches an error if no access token is present', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      ok: false,
    })

    try {
      const response = await getFetcher({
        action: getActions('local')[GetActionNames.getApps],
        connectSession: {} as ReapitConnectSession,
        logger: mockLogger,
        signal,
      })
      expect(response).toBeUndefined()
    } catch (err) {
      expect(mockLogger).toHaveBeenCalledWith(new Error('Missing valid Reapit Connect Session'), {})
    }
  })

  it('uriParams are replace path string', async () => {
    const appId = 'my-app-id'

    window.fetch = jest.fn().mockImplementationOnce((requestInit) => {
      expect(requestInit.split('/').pop()).toBe(appId)
    })

    await getFetcher({
      action: getActions('local')[GetActionNames.getPipeline],
      uriParams: {
        appId,
      },
      connectSession: mockConnectSession,
      logger: mockLogger,
      signal,
    })
  })
})
