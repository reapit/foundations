import * as React from 'react'
import { shallow } from 'enzyme'
import {
  PrivateRouteWrapper,
  PrivateRouteWrapperProps,
  mapDispatchToProps,
  mapStateToProps,
} from '../private-route-wrapper'
import { RefreshParams } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'

jest.mock('../store')

// const FakeRoute = ({ path }: { path: string }) => <div className="render-class" />

const props: PrivateRouteWrapperProps = {
  path: '/',
  isLogin: false,
  setDesktopSession: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    search: '/client/apps?username=wmcvay@reapit.com&desktopToken=TOKEN',
  },
}

// @ts-ignore:
const desktopProps: PrivateRouteWrapperProps = { ...props, isLogin: true, location: { search: '' } }

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PrivateRouteWrapper {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot for desktop login', () => {
    expect(shallow(<PrivateRouteWrapper {...desktopProps} />)).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch correctly', () => {
      const mockDispatch = jest.fn()

      const {
        setDeveloperTermAcceptedCookieAndState,
        setRefreshSession,
        setInitDeveloperTermsAcceptedStateFromCookie,
        setClientTermAcceptedCookieAndState,
      } = mapDispatchToProps(mockDispatch)

      setDeveloperTermAcceptedCookieAndState()
      expect(mockDispatch).toHaveBeenCalledTimes(1)

      setRefreshSession(({ key: 'val' } as unknown) as RefreshParams)
      expect(mockDispatch).toHaveBeenCalledTimes(2)

      setInitDeveloperTermsAcceptedStateFromCookie()
      expect(mockDispatch).toHaveBeenCalledTimes(3)

      setClientTermAcceptedCookieAndState()
      expect(mockDispatch).toHaveBeenCalledTimes(4)
    })
  })

  describe('mapStateToProps', () => {
    it('return correct state', () => {
      const mockedState = {
        auth: {
          refreshSession: {
            mode: 'DESKTOP',
          },
          isTermAccepted: true,
          loginType: 'DEVELOPER',
        },
      }

      expect(mapStateToProps((mockedState as unknown) as ReduxState)).toMatchObject({
        isDesktopMode: true,
        hasSession: true,
        isTermAccepted: true,
        loginType: 'DEVELOPER',
      })
    })
    describe('should return correct value of key "isDesktopMode"', () => {
      it('return true if "state?.auth?.refreshSession?.mode" === "DESKTOP"', () => {
        const mockedState = {
          auth: {
            refreshSession: {
              mode: 'DESKTOP',
            },
          },
        }

        expect(mapStateToProps((mockedState as unknown) as ReduxState)).toMatchObject({
          isDesktopMode: true,
        })
      })
      it('return true if "state?.auth?.refreshSession?.mode" !== "DESKTOP"', () => {
        const mockedState = {
          auth: {
            refreshSession: {
              mode: 'NOT DESKTOP',
            },
          },
        }

        expect(mapStateToProps((mockedState as unknown) as ReduxState)).toMatchObject({
          isDesktopMode: false,
        })
      })
    })
    describe('should return correct value of key "hasSession"', () => {
      it('return true if "state.auth.loginSession" truthy', () => {
        const mockedState = {
          auth: {
            loginSession: 'truthy',
          },
        }

        expect(mapStateToProps((mockedState as unknown) as ReduxState)).toMatchObject({
          hasSession: true,
        })
      })
      it('return true if "state.auth.refreshSession" truthy', () => {
        const mockedState = {
          auth: {
            refreshSession: 'truthy',
          },
        }

        expect(mapStateToProps((mockedState as unknown) as ReduxState)).toMatchObject({
          hasSession: true,
        })
      })
      it('return true if both "state.auth.refreshSession" and "state.auth.refreshSession" is falsy', () => {
        const mockedState = {
          auth: {},
        }

        expect(mapStateToProps((mockedState as unknown) as ReduxState)).toMatchObject({
          hasSession: false,
        })
      })
    })
  })
})
