import appsReducer, { defaultState } from '@/reducers/apps'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'

describe('appsReducer - list', () => {
  it('should set loading to true when FETCH_APP_LIST action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_APP_LIST as ActionType,
      data: { pageNumber: 1, appName: '1', companyName: '1', developerName: '1' },
    })
    const expected = {
      ...defaultState,
      list: {
        ...defaultState.list,
        isLoading: true,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when FETCH_APP_LIST_SUCCESS action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.REQUEST_MARK_APP_AS_FEATURED as ActionType,
      data: appsDataStub.data,
    })
    const expected = {
      ...defaultState,
      list: {
        ...defaultState.list,
        isLoading: false,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should isLoading to false when APPS_ action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_APP_LIST_SUCCESS as ActionType,
      data: appsDataStub.data,
    })
    const expected = {
      ...defaultState,
      list: {
        ...defaultState.list,
        ...appsDataStub.data,
      },
    }
    expect(newState).toEqual(expected)
  })
})
