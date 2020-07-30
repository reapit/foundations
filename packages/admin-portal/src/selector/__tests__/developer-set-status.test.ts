import { ReduxState } from '@/types/core'
import { selectDeveloperSetStatusFormState } from '../developer-set-status'

describe('selectAppDeleteFormState', () => {
  it('should run correctly', () => {
    const input = ({
      developers: {
        setStatusFormState: 'SUCCESS',
      },
    } as unknown) as ReduxState
    const result = selectDeveloperSetStatusFormState(input)
    expect(result).toEqual('SUCCESS')
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectDeveloperSetStatusFormState(input)
    expect(result).toEqual(undefined)
  })
})
