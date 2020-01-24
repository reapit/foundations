import developerSetStatusReducer, { defaultState } from '../developer-set-status'
import { RequestState, ActionType } from '../../types/core'

describe('developer set status reducer', () => {
  it('should return state unchanged if unknow action', () => {
    const newState = developerSetStatusReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set form state to submitting', () => {
    const newState = developerSetStatusReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_REQUEST_LOADING' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      formState: 'SUBMITTING',
    } as RequestState
    expect(newState).toEqual(expected)
  })

  it('should set form state to success', () => {
    const newState = developerSetStatusReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_REQUEST_SUCCESS' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      formState: 'SUCCESS',
    } as RequestState
    expect(newState).toEqual(expected)
  })

  it('should set form state to error', () => {
    const newState = developerSetStatusReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_REQUEST_FAILURE' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      formState: 'ERROR',
    } as RequestState
    expect(newState).toEqual(expected)
  })

  it('should set form state to pending', () => {
    const newState = developerSetStatusReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      formState: 'PENDING',
    } as RequestState
    expect(newState).toEqual(expected)
  })
})
