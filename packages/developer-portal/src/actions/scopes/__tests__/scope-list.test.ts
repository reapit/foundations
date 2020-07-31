import { fetchScopeList, fetchScopeListFailed, fetchScopeListSuccess } from '../scope-list'
import ActionTypes from '@/constants/action-types'

describe('scope list actions', () => {
  it('should create a fetchScopeList action', () => {
    expect(fetchScopeList.type).toEqual(ActionTypes.FETCH_SCOPE_LIST)
  })

  it('should create a fetchScopeListSuccess action', () => {
    expect(fetchScopeListSuccess.type).toEqual(ActionTypes.FETCH_SCOPE_LIST_SUCCESS)
  })

  it('should create a fetchScopeListFailed action', () => {
    expect(fetchScopeListFailed.type).toEqual(ActionTypes.FETCH_SCOPE_LIST_FAILED)
  })
})
