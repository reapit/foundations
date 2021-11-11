import { GetActionNames, getActions, getFetcher } from '..'

const mockData = {
  key: 'value',
}

const mockConnectSession = {
  accessToken: 'SOME_TOKEN',
}

const mockLogger = jest.fn()

describe('getFetcher', () => {
  it('fetches and returns data if response is ok', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      ok: true,
      json: () => mockData,
    })

    const response = await getFetcher({
      action: GetActionNames.getApps,
      connectSession: mockConnectSession,
      logger: mockLogger,
    })

    expect(response).toEqual(mockData)
  })

  it('catches an error if the status code is not ok', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      ok: false,
    })

    try {
      const response = await getFetcher({
        action: GetActionNames.getApps,
        connectSession: mockConnectSession,
        logger: mockLogger,
      })
      expect(response).toBeUndefined()
    } catch (err) {
      expect(mockLogger).toHaveBeenCalledWith(new Error(getActions[GetActionNames.getApps].errorMessage))
    }
  })

  it('catches an error if no access token is present', async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      ok: false,
    })

    try {
      const response = await getFetcher({
        action: GetActionNames.getApps,
        connectSession: {},
        logger: mockLogger,
      })
      expect(response).toBeUndefined()
    } catch (err) {
      expect(mockLogger).toHaveBeenCalledWith(new Error('Missing valid Reapit Connect Session'))
    }
  })
})
