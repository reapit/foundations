import errorReducer, { defaultState, ErrorData } from '../error'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import errorMessages from '../../constants/error-messages'

describe('error reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = errorReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set a component error', () => {
    const errorData = {
      type: 'COMPONENT',
      message: errorMessages.DEFAULT_COMPONENT_ERROR,
    } as ErrorData
    const newState = errorReducer(undefined, {
      type: ActionTypes.ERROR_THROWN_COMPONENT as ActionType,
      data: errorData,
    })
    const expected = {
      ...defaultState,
      componentError: errorData,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear a component error', () => {
    const errorData = {
      type: 'COMPONENT',
      message: errorMessages.DEFAULT_COMPONENT_ERROR,
    } as ErrorData

    const newState = errorReducer(
      { ...defaultState, componentError: errorData },
      {
        type: ActionTypes.ERROR_CLEARED_COMPONENT as ActionType,
        data: null,
      },
    )
    const expected = {
      ...defaultState,
      componentError: null,
    }
    expect(newState).toEqual(expected)
  })

  it('should set a server error', () => {
    const errorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    } as ErrorData
    const newState = errorReducer(undefined, {
      type: ActionTypes.ERROR_THROWN_SERVER as ActionType,
      data: errorData,
    })
    const expected = {
      ...defaultState,
      serverError: errorData,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear a server error', () => {
    const errorData = {
      type: 'SERVER',
      message: errorMessages.DEFAULT_SERVER_ERROR,
    } as ErrorData

    const newState = errorReducer(
      { ...defaultState, serverError: errorData },
      {
        type: ActionTypes.ERROR_CLEARED_SERVER as ActionType,
        data: null,
      },
    )
    const expected = {
      ...defaultState,
      serverError: null,
    }
    expect(newState).toEqual(expected)
  })
})
