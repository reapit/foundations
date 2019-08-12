import appInstallReducer, { defaultState, AppInstallState } from '../app-install'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

const testData: Record<string, AppInstallState> = {
  loading: { formState: 'SUBMITTING' }
}

describe('app-install reducer', () => {
  it('should return fomState = PENDING if action not matched', () => {
    const newState = appInstallReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return formState = "SUBMITTING" when APP_INSTALL_LOADING action is called', () => {
    const newState = appInstallReducer(defaultState, {
      type: ActionTypes.APP_INSTALL_LOADING as ActionType,
      data: true
    })
    expect(newState).toEqual(testData.loading)
  })

  it('should set formState = "SUCCESS" data when APP_INSTALL_REQUEST_DATA_SUCCESS action is called', () => {
    const newState = appInstallReducer(
      { formState: 'SUCCESS' },
      {
        type: ActionTypes.APP_INSTALL_REQUEST_DATA_SUCCESS as ActionType,
        data: undefined
      }
    )
    const expected = {
      formState: 'SUCCESS'
    }
    expect(newState).toEqual(expected)
  })

  it('should set formState="ERROR" when ', () => {
    const newState = appInstallReducer(testData.loading, {
      type: ActionTypes.APP_INSTALL_REQUEST_DATA_FAILURE as ActionType,
      data: undefined
    })
    const expected = {
      formState: 'ERROR'
    }

    expect(newState).toEqual(expected)
  })
})
