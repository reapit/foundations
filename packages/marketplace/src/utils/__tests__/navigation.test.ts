import { navigate, openNewPage } from '../navigation'
import { History } from 'history'
import Routes from '../../constants/routes'

describe('openNewPage', () => {
  it('should open a new page', () => {
    const openSpy = jest.spyOn(window, 'open')
    const curried = openNewPage('https://example.com')
    curried()

    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank')
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
