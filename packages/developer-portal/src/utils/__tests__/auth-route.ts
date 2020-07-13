import { getDefaultRoute, getDefaultPath } from '../auth-route'
import Routes from '@/constants/routes'

describe('getDefaultRoute', () => {
  it('should return origin url + Routes.APPS', () => {
    expect(getDefaultRoute(true)).toEqual(`${window.location.origin}${Routes.APPS}`)
  })

  it('should return origin url + Routes.WELCOME', () => {
    expect(getDefaultRoute(false)).toEqual(`${window.location.origin}${Routes.WELCOME}`)
  })
})

describe('getDefaultPathByLoginType', () => {
  it('should return Routes.APPS', () => {
    expect(getDefaultPath(true, true)).toEqual(Routes.APPS)
  })

  it('should return Routes.APPS', () => {
    expect(getDefaultPath(false, true)).toEqual(Routes.APPS)
  })

  it('should return Routes.WELCOME', () => {
    expect(getDefaultPath(false, false)).toEqual(Routes.WELCOME)
  })
})
