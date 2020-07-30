import { ReduxState } from '@/types/core'
import { selectCategories } from '../categories'
import { categoriesStub } from '@/sagas/__stubs__/categories'

describe('selectCategories', () => {
  it('should run correctly', () => {
    const input = {
      categories: {
        list: categoriesStub,
      },
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
