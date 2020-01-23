import { categoriesReceiveData } from '../app-categories'
import ActionTypes from '@/constants/action-types'

describe('app categories actions', () => {
  it('should create a categoriesReceiveData action', () => {
    expect(categoriesReceiveData.type).toEqual(ActionTypes.CATEGORIES_RECEIVE_DATA)
  })
})
