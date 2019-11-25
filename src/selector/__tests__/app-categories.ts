import { ReduxState } from '@/types/core'
import { selectCategories } from '../app-categories'
import { appCategorieStub } from '../../sagas/__stubs__/app-categories'

describe('selectCategories', () => {
  it('should run correctly', () => {
    const input = {
      appCategories: appCategorieStub
    } as ReduxState
    const result = selectCategories(input)
    expect(result).toEqual(appCategorieStub.data)
  })

  it('should run correctly and return []', () => {
    const input = {} as ReduxState
    const result = selectCategories(input)
    expect(result).toEqual([])
  })
})
