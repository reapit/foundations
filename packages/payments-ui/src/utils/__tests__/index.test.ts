import { History } from 'history'
import { navigate } from '..'

describe('navigate', () => {
  it('should open a new page', () => {
    const mockHistory = {
      push: jest.fn(),
    } as unknown as History

    const curried = navigate(mockHistory, '/payments')

    curried()

    expect(mockHistory.push).toHaveBeenCalledWith('/payments')
  })
})
