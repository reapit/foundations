import webComponentReducer, { defaultState } from '../web-component'
import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'

describe('client app detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = webComponentReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isModalOpen to true when CLIENT_WEB_COMPONENT_CONFIG_OPEN action is called', () => {
    const newState = webComponentReducer(undefined, {
      type: ActionTypes.CLIENT_WEB_COMPONENT_CONFIG_OPEN as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isShowModal: true,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isModalOpen to false when CLIENT_WEB_COMPONENT_CONFIG_CLOSE action is called', () => {
    const newState = webComponentReducer(undefined, {
      type: ActionTypes.CLIENT_WEB_COMPONENT_CONFIG_CLOSE as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isShowModal: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to true when CLIENT_FETCH_WEB_COMPONENT_CONFIG action is called', () => {
    const newState = webComponentReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set updating to true when CLIENT_PUT_WEB_COMPONENT_CONFIG action is called', () => {
    const newState = webComponentReducer(undefined, {
      type: ActionTypes.CLIENT_PUT_WEB_COMPONENT_CONFIG as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      updating: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set updating to true when CLIENT_FETCH_WEB_COMPONENT_CONFIG_SUCCESS action is called', () => {
    const newState = webComponentReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      data: {},
      loading: false,
      updating: false,
    }
    expect(newState).toEqual(expected)
  })
})
