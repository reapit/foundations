import developersReducer, { defaultState, DevelopersState } from '@/reducers/developers'
import { ActionType } from '@/types/core'

describe('developersReducer - setStatussetStatusFormState', () => {
  it('should return state unchanged if unknow action', () => {
    const newState = developersReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set form state to submitting', () => {
    const newState = developersReducer(undefined, {
      type: 'SET_DEVELOPER_STATUS_FORM_STATE_LOADING' as ActionType,
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
      type: 'SET_DEVELOPER_STATUS_FORM_STATE_SUCCESS' as ActionType,
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
      type: 'SET_DEVELOPER_STATUS_FORM_STATE_FAILED' as ActionType,
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
      type: 'INIT_REQUEST_DEVELOPER_STATUS_FORM_STATE' as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      setStatusFormState: 'PENDING',
    } as DevelopersState
    expect(newState).toEqual(expected)
  })
})
