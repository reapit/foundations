import { ReduxState } from '@/types/core'
import { selectLoginType } from '../auth'

describe('selectLoginType', () => {
  it('should run correctly', () => {
    const mockState = {
      auth: {
        loginType: 'CLIENT',
      },
    } as ReduxState
    const result = selectLoginType(mockState)
    expect(result).toEqual(mockState.auth.loginType)
  })
})
