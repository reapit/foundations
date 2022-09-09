import { ExternalPages, navigate, openNewPage } from '../navigation'
import { History } from 'history'
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
    const mockHistory = {
      push: jest.fn(),
    } as unknown as History

    const curried = navigate(mockHistory, Routes.APPS)
    curried()

    expect(mockHistory.push).toHaveBeenCalledWith(Routes.APPS)
  })
})
