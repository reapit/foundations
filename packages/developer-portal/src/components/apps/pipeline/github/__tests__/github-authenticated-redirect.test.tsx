import React, { createContext } from 'react'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
  })),
}))

const returnedFromGithubAndObtainAccessToken = jest.fn()
const githubAuthenticating = false

const MockContext = createContext({
  githubAuthenticating,
  returnedFromGithubAndObtainAccessToken,
})

jest.mock('../github-provider', () => ({
  GithubContext: MockContext,
}))

import { render } from '../../../../../tests/react-testing'
import { GithubAuthenticatedRedirectRoute } from '../github-authenticated-redirect-route'

describe('GtihubAuthenticatedRedirect', () => {
  it('returnedFromGithubAndObtainAccessToken should only be called once', () => {
    render(
      <MockContext.Provider
        value={{
          returnedFromGithubAndObtainAccessToken,
          githubAuthenticating,
        }}
      >
        <GithubAuthenticatedRedirectRoute />
      </MockContext.Provider>,
    )

    expect(returnedFromGithubAndObtainAccessToken).toHaveBeenCalledTimes(1)
  })

  it('Should match snapshot', () => {
    const returnedFromGithubAndObtainAccessToken = jest.fn()
    const githubAuthenticating = false

    const MockContext = createContext({
      githubAuthenticating,
      returnedFromGithubAndObtainAccessToken,
    })

    expect(
      render(
        <MockContext.Provider
          value={{
            returnedFromGithubAndObtainAccessToken,
            githubAuthenticating,
          }}
        >
          <GithubAuthenticatedRedirectRoute />
        </MockContext.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
