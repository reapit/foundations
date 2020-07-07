import { ReduxState } from '@/types/core'
import { selectDeveloperSetStatusFormState } from '../developer-set-status'

describe('selectAppDeleteFormState', () => {
  it('should run correctly', () => {
    const input = {
      developerSetStatus: {
        formState: 'PENDING',
      },
    } as ReduxState
    const result = selectDeveloperSetStatusFormState(input)
    expect(result).toEqual('PENDING')
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectDeveloperSetStatusFormState(input)
    expect(result).toEqual(undefined)
  })
})
