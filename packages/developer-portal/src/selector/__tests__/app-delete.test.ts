import { ReduxState } from '@/types/core'
import { selectAppDeleteFormState } from '../app-delete'

describe('selectAppDeleteFormState', () => {
  it('should run correctly', () => {
    const input = {
      appDelete: {
        formState: 'PENDING',
      },
    } as ReduxState
    const result = selectAppDeleteFormState(input)
    expect(result).toEqual('PENDING')
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectAppDeleteFormState(input)
    expect(result).toEqual(undefined)
  })
})
