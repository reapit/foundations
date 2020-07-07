import { ReduxState } from '@/types/core'
import { selectNotificationMessageState } from '../notification-message'

describe('selectNotificationMessageState', () => {
  it('should run correctly', () => {
    const input = {
      noticationMessage: {
        visible: true,
        message: 'test',
      },
    } as ReduxState
    const result = selectNotificationMessageState(input)
    expect(result).toEqual(input.noticationMessage)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectNotificationMessageState(input)
    expect(result).toEqual(undefined)
  })
})
