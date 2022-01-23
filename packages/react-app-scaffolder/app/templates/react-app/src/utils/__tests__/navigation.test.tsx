import { navigate, openNewPage } from '../navigation'
import { History } from 'history'
import { Routes } from '../../constants/routes'

describe('navigate', () => {
  it('should open a new page', () => {
    const mockHistory = {
      push: jest.fn(),
    } as unknown as History

    const curried = navigate(mockHistory, Routes.HOME)

    curried()

    expect(mockHistory.push).toHaveBeenCalledWith(Routes.HOME)
  })
})

describe('openNewPage', () => {
  it('should open a new page', () => {
    const windowSpy = ((window.open as any) = jest.fn())
    const curried = openNewPage(Routes.HOME)

    curried()

    expect(windowSpy).toHaveBeenCalledWith(Routes.HOME, '_blank')
  })
})
