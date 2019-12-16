import { ReduxState } from '@/types/core'
import { selectCategories } from '../app-categories'
import { appCategorieStub } from '../../sagas/__stubs__/app-categories'

describe('selectCategories', () => {
  it('should run correctly', () => {
    const input = {
      appCategories: appCategorieStub
    } as ReduxState
    const result = selectCategories(input)
    expect(result).toEqual(appCategorieStub.data?.concat({ id: 'DIRECT_API_APPS_FILTER', name: 'Direct API' }))
  })

  it("should run correctly and return [{id: 'DIRECT_API_APPS_FILTER', name: 'Direct API'}]", () => {
    const input = {} as ReduxState
    const expected = [{ id: 'DIRECT_API_APPS_FILTER', name: 'Direct API' }]
    const result = selectCategories(input)
    expect(result).toEqual(expected)
  })
})
