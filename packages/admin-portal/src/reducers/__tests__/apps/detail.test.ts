import appsReducer, { defaultState } from '@/reducers/apps'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'

describe('appsReducer - detail', () => {
  it('should set loading to true when FETCH_APP_DETAIL action is called', () => {
    const newState = appsReducer(undefined, { type: ActionTypes.FETCH_APP_DETAIL as ActionType, data: true })
    const expected = {
      ...defaultState,
      detail: { ...defaultState.detail, isLoading: true },
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when FETCH_APP_DETAIL_FAILURE action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL_FAILURE as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      detail: {
        ...defaultState.detail,
        isLoading: false,
        errorMessage: true,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when FETCH_APP_DETAIL_SUCCESS action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL_SUCCESS as ActionType,
      data: appDetailDataStub,
    })
    const expected = {
      ...defaultState,
      detail: {
        ...defaultState.detail,
        data: appDetailDataStub.data,
      },
    }
    expect(newState).toEqual(expected)
  })
})
