import { getDefaultRoute, getDefaultPath } from '../auth-route'
import Routes from '@/constants/routes'

describe('getDefaultRoute', () => {
  it('should return origin url + Routes.DEVELOPER_MY_APPS', () => {
    expect(getDefaultRoute(true)).toEqual(`${window.location.origin}${Routes.DEVELOPER_MY_APPS}`)
  })

  it('should return origin url + Routes.DEVELOPER_WELCOME', () => {
    expect(getDefaultRoute(false)).toEqual(`${window.location.origin}${Routes.DEVELOPER_WELCOME}`)
  })
})

describe('getDefaultPathByLoginType', () => {
  it('should return Routes.DEVELOPER_MY_APPS', () => {
    expect(getDefaultPath(true, true)).toEqual(Routes.DEVELOPER_MY_APPS)
  })

  it('should return Routes.DEVELOPER_MY_APPS', () => {
    expect(getDefaultPath(false, true)).toEqual(Routes.DEVELOPER_MY_APPS)
  })

  it('should return Routes.DEVELOPER_WELCOME', () => {
    expect(getDefaultPath(false, false)).toEqual(Routes.DEVELOPER_WELCOME)
  })
})
