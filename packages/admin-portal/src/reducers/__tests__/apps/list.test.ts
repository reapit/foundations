import appsReducer, { defaultState } from '@/reducers/apps'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'

describe('appsReducer - list', () => {
  it('should set loading to true when APPS_REQUEST_DATA action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.APPS_REQUEST_DATA as ActionType,
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

  it('should set approvals list data when APPS_RECEIVE_DATA action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.APPS_RECEIVE_DATA as ActionType,
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
