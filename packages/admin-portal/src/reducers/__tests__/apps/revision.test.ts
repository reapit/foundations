import appsReducer, { defaultState } from '../../apps'
import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { revisionDetailDataStub } from '@/sagas/apps/__stubs__/revision-detail'

describe('appReducer - revision', () => {
  it('should set loading to true when REVISION_DETAIL_LOADING action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      revision: {
        ...defaultState.revision,
        isLoading: true,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when REVISION_DETAIL_REQUEST_DATA__FAILURE action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_REQUEST_DATA__FAILURE as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      revision: {
        ...defaultState.revision,
        errorMessage: '',
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set revision-detail item data when REVISION_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_RECEIVE_DATA as ActionType,
      data: revisionDetailDataStub,
    })
    const expected = {
      ...defaultState,
      revision: {
        ...defaultState.revision,
        data: revisionDetailDataStub,
      },
    }
    expect(newState).toEqual(expected)
  })
})
