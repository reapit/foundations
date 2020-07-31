import developersReducer, { defaultState, DevelopersState } from '@/reducers/developers'
import { ActionType } from '@/types/core'

describe('developersReducer - setStatussetStatusFormState', () => {
  it('should return state unchanged if unknow action', () => {
    const newState = developersReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set form state to submitting', () => {
    const newState = developersReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_REQUEST_LOADING' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      setStatusFormState: 'SUBMITTING',
    } as DevelopersState
    expect(newState).toEqual(expected)
  })

  it('should set form state to success', () => {
    const newState = developersReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_REQUEST_SUCCESS' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      setStatusFormState: 'SUCCESS',
    } as DevelopersState
    expect(newState).toEqual(expected)
  })

  it('should set form state to error', () => {
    const newState = developersReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_REQUEST_FAILURE' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      setStatusFormState: 'ERROR',
    } as DevelopersState
    expect(newState).toEqual(expected)
  })

  it('should set form state to pending', () => {
    const newState = developersReducer(undefined, {
      type: 'DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      setStatusFormState: 'PENDING',
    } as DevelopersState
    expect(newState).toEqual(expected)
  })
})
