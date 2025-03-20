import React, { useContext, useEffect } from 'react'
import { render, waitFor } from '../../../../../tests/react-testing'

const authenticateWithGithub = jest.fn()
const redirectToGithub = jest.fn()
const mockGetItem = jest.fn()
const mockSetItem = jest.fn()

jest.mock('./../utils', () => ({
  authenticateWithGithub: authenticateWithGithub,
  redirectToGithub: redirectToGithub,
  storageMethod: {
    getItem: mockGetItem,
    setItem: mockSetItem,
  },
}))

import { GithubContext, GithubProvider } from '../github-provider'
import { ReapitConnectSession } from '@reapit/connect-session'

describe('GithubProvider', () => {
  describe('loginWithGithub', () => {
    afterEach(() => {
      authenticateWithGithub.mockReset()
      redirectToGithub.mockReset()
      mockGetItem.mockReset()
      mockSetItem.mockReset()
    })

    it('Will redirect with no stored credentials', () => {
      const redirectPath = 'redirect/back/here?withQuery=true'

      const TestCall = () => {
        const { loginWithGithub } = useContext(GithubContext)

        useEffect(() => {
          loginWithGithub({} as ReapitConnectSession, redirectPath)
        }, [])
        return <></>
      }

      render(
        <GithubProvider>
          <TestCall />
        </GithubProvider>,
      )

      expect(redirectToGithub).toHaveBeenCalledWith(expect.stringContaining('github'), redirectPath)
    })

    it('Will authenticate with refresh token', async () => {
      const ghuRefreshToken = 'ghu_refreshTokenBroski'
      const validAccessToken = 'ghu_accessToken'
      mockGetItem.mockImplementationOnce((key: string) => {
        key === 'githubSession'
          ? JSON.stringify({
              refresh_token: ghuRefreshToken,
            })
          : undefined
      })
      authenticateWithGithub.mockImplementationOnce(() => ({
        access_token: validAccessToken,
      }))

      const TestCall = () => {
        const { loginWithGithub } = useContext(GithubContext)

        useEffect(() => {
          loginWithGithub({} as ReapitConnectSession)
        }, [])
        return <></>
      }

      render(
        <GithubProvider>
          <TestCall />
        </GithubProvider>,
      )

      await waitFor(() => {
        expect(authenticateWithGithub).toHaveBeenCalledWith(
          expect.objectContaining({
            refresh_token: ghuRefreshToken,
          }),
          expect.objectContaining({}),
        )

        expect(mockSetItem).toHaveBeenCalled()
      })
    })

    it('Will redirect when refresh token fails', async () => {
      const ghuRefreshToken = 'ghu_refreshTokenBroski'
      mockGetItem.mockImplementationOnce((key: string) => {
        key === 'githubSession'
          ? JSON.stringify({
              refresh_token: ghuRefreshToken,
            })
          : undefined
      })
      authenticateWithGithub.mockImplementationOnce(() => ({
        error: 'some sort of error happened',
        errorMessage: 'An error happened and this is a message to let you know about it',
      }))

      const TestCall = () => {
        const { loginWithGithub } = useContext(GithubContext)

        useEffect(() => {
          loginWithGithub({} as ReapitConnectSession)
        }, [])
        return <></>
      }

      render(
        <GithubProvider>
          <TestCall />
        </GithubProvider>,
      )

      await waitFor(() => {
        expect(authenticateWithGithub).toHaveBeenCalledWith(
          expect.objectContaining({
            refresh_token: ghuRefreshToken,
          }),
          expect.objectContaining({}),
        )

        expect(redirectToGithub).toHaveBeenCalled()
      })
    })
  })

  describe('returnedFromGithubAndObtainAccessToken', () => {
    afterEach(() => {
      authenticateWithGithub.mockReset()
      redirectToGithub.mockReset()
      mockGetItem.mockReset()
      mockSetItem.mockReset()
    })
    it('Will call authenticateWithGithub when code is present', async () => {
      const validAccessToken = 'ghu_accessToken'
      const githubAuthCode = 'githubAuthCode'
      authenticateWithGithub.mockImplementationOnce(() => ({
        access_token: validAccessToken,
      }))
      window.location.search = `?code=${githubAuthCode}`

      const navigate = jest.fn()

      const TestCall = () => {
        const { returnedFromGithubAndObtainAccessToken } = useContext(GithubContext)

        useEffect(() => {
          returnedFromGithubAndObtainAccessToken({} as ReapitConnectSession, navigate)
        }, [])
        return <></>
      }

      render(
        <GithubProvider>
          <TestCall />
        </GithubProvider>,
      )

      await waitFor(() => {
        expect(authenticateWithGithub).toHaveBeenCalledWith(
          expect.objectContaining({
            code: githubAuthCode,
            redirect_uri: expect.stringContaining('github'),
          }),
          expect.objectContaining({}),
        )

        expect(mockSetItem).toHaveBeenCalled()
      })
    })

    it('If state present with route, navigate function will be called', async () => {
      const validAccessToken = 'ghu_accessToken'
      const githubAuthCode = 'githubAuthCode'
      const navigateToPath = 'navigate/to/this/path'
      const encodedState = Buffer.from(JSON.stringify({ route: navigateToPath })).toString('base64')
      authenticateWithGithub.mockImplementationOnce(() => ({
        access_token: validAccessToken,
      }))
      window.location.search = `?code=${githubAuthCode}&state=${encodedState}`

      const navigate = jest.fn()

      const TestCall = () => {
        const { returnedFromGithubAndObtainAccessToken } = useContext(GithubContext)

        useEffect(() => {
          returnedFromGithubAndObtainAccessToken({} as ReapitConnectSession, navigate)
        }, [])
        return <></>
      }

      render(
        <GithubProvider>
          <TestCall />
        </GithubProvider>,
      )

      await waitFor(() => {
        expect(authenticateWithGithub).toHaveBeenCalledWith(
          expect.objectContaining({
            code: githubAuthCode,
            redirect_uri: expect.stringContaining('github'),
          }),
          expect.objectContaining({}),
        )

        expect(mockSetItem).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith(navigateToPath)
      })
    })
  })
})
