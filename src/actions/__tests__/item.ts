import { itemLoading, itemReceiveData, itemRequestData, itemClearData } from '../item'
import ActionTypes from '../../constants/action-types'
import { itemDataStub } from '../../sagas/__stubs__/item'

describe('item actions', () => {
  it('should create a itemLoading action', () => {
    expect(itemLoading.type).toEqual(ActionTypes.ITEM_LOADING)
    expect(itemLoading(true).data).toEqual(true)
  })

  it('should create a itemReceiveData action', () => {
    expect(itemReceiveData.type).toEqual(ActionTypes.ITEM_RECEIVE_DATA)
    expect(itemReceiveData(itemDataStub).data).toEqual(itemDataStub)
  })

  it('should create a itemRequestData action', () => {
    expect(itemRequestData.type).toEqual(ActionTypes.ITEM_REQUEST_DATA)
    expect(itemRequestData().data).toEqual(undefined)
  })

  it('should create a itemClearData action', () => {
    expect(itemClearData.type).toEqual(ActionTypes.ITEM_CLEAR_DATA)
    expect(itemClearData(null).data).toEqual(null)
  })
})
