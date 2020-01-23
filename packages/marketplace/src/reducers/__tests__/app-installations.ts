import appInstallationsReducer, { defaultState, AppInstallationsState } from '../app-installations'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { installationStub } from '@/sagas/__stubs__/installation'

describe('app-installations reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appInstallationsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return loading true when APP_INSTALLATIONS_REQUEST_DATA action is called', () => {
    const newState = appInstallationsReducer(defaultState, {
      type: ActionTypes.APP_INSTALLATIONS_REQUEST_DATA as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should return installationsAppData when APP_INSTALLATIONS_RECEIVE_DATA action is called', () => {
    const newState = appInstallationsReducer(defaultState, {
      type: ActionTypes.APP_INSTALLATIONS_RECEIVE_DATA as ActionType,
      data: installationStub
    })
    const expected = {
      ...defaultState,
      installationsAppData: installationStub
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading false when APP_INSTALLATIONS_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appInstallationsReducer(defaultState, {
      type: ActionTypes.APP_INSTALLATIONS_REQUEST_DATA_FAILURE as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      loading: false
    }
    expect(newState).toEqual(expected)
  })

  it('should return formState when APP_INSTALLATIONS_SET_FORM_STATEL action is called', () => {
    const newState = appInstallationsReducer(defaultState, {
      type: ActionTypes.APP_INSTALLATIONS_SET_FORM_STATE as ActionType,
      data: 'SUCCESS'
    })
    const expected = {
      ...defaultState,
      formState: 'SUCCESS'
    }
    expect(newState).toEqual(expected)
  })
})
