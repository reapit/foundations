import { ReduxState } from '@/types/core'
import { selectErrorState } from '../error'

describe('selectNotificationMessageState', () => {
  it('should run correctly', () => {
    const input = {
      error: {
        componentError: {
          type: 'COMPONENT',
          message: 'test',
        },
      },
    } as ReduxState
    const result = selectErrorState(input)
    expect(result).toEqual(input.error)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectErrorState(input)
    expect(result).toEqual(undefined)
  })
})
