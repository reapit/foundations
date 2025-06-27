import { navigateRoute, openNewPage } from '../navigation'
import { RoutePaths } from '../../constants/routes'

describe('navigate', () => {
  it('should open a new page', () => {
    const navigate = jest.fn()
    const curried = navigateRoute(navigate, RoutePaths.HOME)

    curried()

    expect(navigate).toHaveBeenCalledWith(RoutePaths.HOME)
  })
})

describe('openNewPage', () => {
  it('should open a new page', () => {
    const windowSpy = ((window.open as any) = jest.fn())
    const curried = openNewPage(RoutePaths.HOME)

    curried()

    expect(windowSpy).toHaveBeenCalledWith(RoutePaths.HOME, '_blank', 'noopener, noreferrer')
  })
})
