import { ReduxState } from '@/types/core'
import { selectCategories } from '../app-categories'
import { categoriesStub } from '../../sagas/__stubs__/app-categories'

describe('selectCategories', () => {
  it('should run correctly', () => {
    const input = {
      appCategories: categoriesStub,
    } as ReduxState
    const result = selectCategories(input)
    expect(result).toEqual(categoriesStub.data)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const expected = []
    const result = selectCategories(input)
    expect(result).toEqual(expected)
  })
})
