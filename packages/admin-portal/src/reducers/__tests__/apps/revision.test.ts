import appsReducer, { defaultState } from '../../apps'
import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { revisionDetailDataStub } from '@/sagas/apps/__stubs__/revision-detail'

describe('appReducer - revision', () => {
  it('should set error to false when FETCH_REVISION_FAILED action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_REVISION_FAILED as ActionType,
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

  it('should set revision-detail item data when FETCH_REVISION_SUCCESS action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.FETCH_REVISION_SUCCESS as ActionType,
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
