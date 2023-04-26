import { navigateRoute, openNewPage, handleLaunchApp, navigateBack, navigateExternal } from '../navigation'
import { RoutePaths } from '../../constants/routes'

jest.mock('../../core/analytics')

describe('navigate', () => {
  it('should open a new page', () => {
    const navigate = jest.fn()

    const curried = navigateRoute(navigate, RoutePaths.HOME)

    curried()

    expect(navigate).toHaveBeenCalledWith(RoutePaths.HOME)
  })
})

describe('navigateBack', () => {
  it('should navigate back', () => {
    const navigate = jest.fn()

    const curried = navigateBack(navigate)

    curried()

    expect(navigate).toHaveBeenCalledTimes(1)
  })
})

describe('navigateExternal', () => {
  it('should navigate to an external page', () => {
    const launchUri = 'https://foobar.com'

    const curried = navigateExternal(launchUri)

    curried()

    expect(window.location.href).toEqual(launchUri)
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

describe('handleLaunchApp', () => {
  it('should not change location if no launchUri', () => {
    window.location.href = '/foo'
    const id = 'MOCK_ID'
    const launchUri = undefined
    const curried = handleLaunchApp(false, id, launchUri)

    curried()

    expect(window.location.href).toEqual('/foo')
  })

  it('should correctly launch if in web mode', () => {
    const id = 'MOCK_ID'
    const launchUri = 'https://foobar.com'
    const curried = handleLaunchApp(false, id, launchUri)

    curried()

    expect(window.location.href).toEqual(launchUri)
  })

  it('should correctly launch if in desktop mode', () => {
    const id = 'MOCK_ID'
    const launchUri = 'https://foobar.com'
    const curried = handleLaunchApp(true, id, launchUri)

    curried()

    expect(window.location.href).toEqual(`agencycloud://app?id=${id}&launchUri=${launchUri}`)
  })
})
