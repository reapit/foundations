import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ApiKeys, handleCopyCode, handleCreateApiKey, handleDeleteApiKey, handleSetApikey } from '../pipeline-api-keys'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

jest.useFakeTimers()

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [
    {
      items: [
        {
          id: 'MOCK_ID',
          apiKey: 'MOCK_KEY',
          keyExpiresAt: '25 Apr 2023 04:28:25',
        },
      ],
    },
  ]),
  useReapitUpdate: jest.fn(() => [false, undefined, jest.fn(), false]),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
        email: 'MOCK_EMAIL',
      },
    },
  })),
}))

describe('ApiKeys', () => {
  it('should match snapshot', () => {
    expect(render(<ApiKeys closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleSetApikey', () => {
  it('should handle setting an api key', () => {
    const setApiKeyId = jest.fn()
    const apiKeyid = 'MOCK_ID'
    const curried = handleSetApikey(setApiKeyId, apiKeyid)

    curried()

    expect(setApiKeyId).toHaveBeenCalledWith(apiKeyid)
  })
})

describe('handleDeleteApiKey', () => {
  it('should handle setting an api key', async () => {
    const setApiKeyId = jest.fn()
    const deleteApiKey = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const refreshApiKeys = jest.fn()
    const apiKeyid = 'MOCK_ID'

    const curried = handleDeleteApiKey(setApiKeyId, deleteApiKey, refreshApiKeys, apiKeyid)

    curried()

    await new Promise<boolean>((resolve) => resolve(true))

    expect(setApiKeyId).toHaveBeenCalledWith(null)
    expect(deleteApiKey).toHaveBeenCalledTimes(1)
    expect(refreshApiKeys).toHaveBeenCalledTimes(1)
  })
})

describe('handleCreateApiKey', () => {
  it('should handle setting an api key', async () => {
    const createApiKey = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const refreshApiKeys = jest.fn()
    const developerId = 'MOCK_ID'
    const email = 'MOCK_EMAIL'

    const curried = handleCreateApiKey(createApiKey, refreshApiKeys, developerId, email)

    curried()

    await new Promise<boolean>((resolve) => resolve(true))

    expect(createApiKey).toHaveBeenCalledTimes(1)
    expect(refreshApiKeys).toHaveBeenCalledTimes(1)
  })
})

describe('handleCopyCode', () => {
  it('should set then reset the copy text', () => {
    const setCopyState = jest.fn()
    const copied = 'MOCK_ID'

    const curried = handleCopyCode(setCopyState, copied)

    curried()

    jest.runAllTimers()

    expect(setCopyState).toHaveBeenCalledTimes(2)
    expect(setCopyState).toHaveBeenCalledWith(copied)
    expect(setCopyState).toHaveBeenCalledWith('')
  })
})
