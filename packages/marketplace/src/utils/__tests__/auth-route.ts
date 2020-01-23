import { getAuthRouteByLoginType, getLoginTypeByPath } from '../auth-route'
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
