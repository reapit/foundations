import { getMockRouterProps } from '@/utils/mock-helper'
import { canGoBack } from '../router-helper'

describe('canGoBack', () => {
  it('should return true', () => {
    const { history } = getMockRouterProps({}, 3)
    const result = canGoBack(history)
    expect(result).toBeTruthy()
  })
  it('should return false', () => {
    const { history } = getMockRouterProps({})
    const result = canGoBack(history)
    expect(result).toBeFalsy()
  })
})
