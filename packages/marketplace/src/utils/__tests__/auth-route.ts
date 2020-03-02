import {
  getAuthRouteByLoginType,
  getLoginTypeByPath,
  getDefaultPathByLoginType,
  getDefaultRouteByLoginType,
} from '../auth-route'
import Routes from '../../constants/routes'

describe('getAuthRouteByLoginType', () => {
  it('should return correct route', () => {
    expect(getAuthRouteByLoginType('ADMIN')).toEqual(Routes.ADMIN_LOGIN)
    expect(getAuthRouteByLoginType('DEVELOPER')).toEqual(Routes.DEVELOPER_LOGIN)
    expect(getAuthRouteByLoginType('CLIENT')).toEqual(Routes.CLIENT_LOGIN)
  })
})

describe('getLoginTypeByPath', () => {
  it('should return correct login type', () => {
    expect(getLoginTypeByPath(Routes.ADMIN_LOGIN)).toEqual('ADMIN')
    expect(getLoginTypeByPath(Routes.DEVELOPER_LOGIN)).toEqual('DEVELOPER')
    expect(getLoginTypeByPath(Routes.CLIENT_LOGIN)).toEqual('CLIENT')
  })
})

describe('getDefaultRouteByLoginType', () => {
  it('should return correct route', () => {
    const firstLoginCookie = '1'
    expect(getDefaultRouteByLoginType('ADMIN', firstLoginCookie)).toEqual(
      `${window.location.origin}${Routes.ADMIN_APPROVALS}`,
    )
    expect(getDefaultRouteByLoginType('DEVELOPER', firstLoginCookie)).toEqual(
      `${window.location.origin}${Routes.DEVELOPER_MY_APPS}`,
    )
    expect(getDefaultRouteByLoginType('CLIENT', firstLoginCookie)).toEqual(
      `${window.location.origin}${Routes.INSTALLED_APPS}`,
    )
  })

  it('should return correct route DEVELOPER when not found firstLoginCookie', () => {
    const firstLoginCookie = undefined

    expect(getDefaultRouteByLoginType('DEVELOPER', firstLoginCookie)).toEqual(
      `${window.location.origin}${Routes.DEVELOPER_WELCOME}`,
    )
    expect(getDefaultRouteByLoginType('CLIENT', firstLoginCookie)).toEqual(
      `${window.location.origin}${Routes.CLIENT_WELCOME}`,
    )
  })
})

describe('getDefaultPathByLoginType', () => {
  it('should return correct path', () => {
    const firstLoginCookie = '1'
    expect(getDefaultPathByLoginType('ADMIN', firstLoginCookie)).toEqual(Routes.ADMIN_APPROVALS)
    expect(getDefaultPathByLoginType('DEVELOPER', firstLoginCookie)).toEqual(Routes.DEVELOPER_MY_APPS)
    expect(getDefaultPathByLoginType('CLIENT', firstLoginCookie)).toEqual(Routes.INSTALLED_APPS)
  })

  it('should return correct path DEVELOPER when not found firstLoginCookie', () => {
    const firstLoginCookie = undefined
    expect(getDefaultPathByLoginType('DEVELOPER', firstLoginCookie)).toEqual(Routes.DEVELOPER_WELCOME)
    expect(getDefaultPathByLoginType('CLIENT', firstLoginCookie)).toEqual(Routes.CLIENT_WELCOME)
  })
})
