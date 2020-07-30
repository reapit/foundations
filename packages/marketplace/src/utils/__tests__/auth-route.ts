import { getDefaultRoute } from '../auth-route'
import Routes from '@/constants/routes'

describe('getDefaultRoute', () => {
  it('should return correct route', () => {
    expect(getDefaultRoute()).toEqual(`${window.location.origin}${Routes.INSTALLED_APPS}`)
  })
})
