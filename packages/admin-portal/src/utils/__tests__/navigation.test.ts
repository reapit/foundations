import { ExternalPages, navigateRoute, openNewPage } from '../navigation'
import Routes from '../../constants/routes'

describe('openNewPage', () => {
  it('should open a new page', () => {
    const openSpy = jest.spyOn(window, 'open')
    const curried = openNewPage(ExternalPages.platformAPIDocs)
    curried()

    expect(openSpy).toHaveBeenCalledWith(ExternalPages.platformAPIDocs, '_blank', 'noopener, noreferrer')
  })
})

describe('navigate', () => {
  it('should open a new page', () => {
    const navigate = jest.fn()
    const curried = navigateRoute(navigate, Routes.APPS)
    curried()

    expect(navigate).toHaveBeenCalledWith(Routes.APPS)
  })
})
